import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { Order, OrderDocument } from './entities/order.entity';
import { Product, ProductDocument } from 'src/product/entities/product.entity';
import { Status } from './entities/status.entity';
import { OrderLine ,OrderLineDocument } from './entities/order-line.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(OrderLine.name) private orderLineModel: Model<OrderLineDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(createOrderDto: CreateOrderLineDto[], userId: string) {
  const session = await this.connection.startSession();
  session.startTransaction();

  try {
    // Get pending status
    const pendingStatus = await this.connection.model(Status.name).findOne({ name: 'pending' });
    if (!pendingStatus) throw new NotFoundException('Pending status not found');

    // Create order with total = 0
    const order = await this.orderModel.create(
      [{
        user: new Types.ObjectId(userId),
        total: 0,
        status: pendingStatus._id,
        orderLines: [],
      }],
      { session },
    );

    const orderDoc = order[0]; // create([]) returns array
    let total = 0;
    const orderLineDocs: OrderLineDocument[] = [];

    // Create order lines with stock check/update
    for (const item of createOrderDto) {
      if (!Types.ObjectId.isValid(item.productID)) {
        throw new BadRequestException('Invalid product ID');
      }

      const product = await this.productModel.findById(item.productID).session(session);
      if (!product) throw new NotFoundException(`Product ${item.productID} not found`);

      // Check stock
      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Not enough stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
        );
      }

      // Reduce stock
      product.stock -= item.quantity;
      await product.save({ session });

      // Create order line
      const orderLine = await this.orderLineModel.create(
        [{
          order: orderDoc._id,
          product: product._id,
          quantity: item.quantity,
          priceSnapshot: product.price,
        }],
        { session },
      );

      orderLineDocs.push(orderLine[0]);
      total += product.price * item.quantity;
    }

    const orderLineIds = orderLineDocs.map((ol) => ol._id);

    // Update order with total + orderLines
    await this.orderModel.updateOne(
      { _id: orderDoc._id },
      { $set: { total, orderLines: orderLineIds } },
      { session },
    );

    await session.commitTransaction();

    // Return populated order
    return await this.orderModel.findById(orderDoc._id).populate([
      { path: 'status' },
      {
        path: 'orderLines',
        select: 'quantity priceSnapshot',
        populate: { path: 'product' },
      },
    ]).select('-user');
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}

  async findAll() {
    return this.orderModel.find().populate([
      { path: 'user', select: 'username email' },
      { path: 'status' },
        {
          path: 'orderLines', select: 'quantity priceSnapshot',
          populate: { path: 'product' },
        },
      ]);
  }

  async findMyOrders(userID: string) {
    return this.orderModel.find({ user: userID }).populate([
        { path: 'status' },
        {
          path: 'orderLines', select: 'quantity priceSnapshot',
          populate: { path: 'product' },
        },
      ]).select('-user');
  }

  async update(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException(`Order ${id} not found`);

    // Flow: pending -> shipped -> delivered
    const currentStatus = await this.connection.model(Status.name).findById(order.status);
    if (!currentStatus) throw new NotFoundException('Current status not found');

    let nextStatusName: string;
    if (currentStatus.name === 'pending') nextStatusName = 'shipped';
    else if (currentStatus.name === 'shipped') nextStatusName = 'delivered';
    else throw new BadRequestException('Order already delivered');

    const nextStatus = await this.connection.model(Status.name).findOne({ name: nextStatusName });
    if (!nextStatus) throw new NotFoundException(`${nextStatusName} status not found`);

    order.status = nextStatus._id;
    await order.save();

    return order.populate('status');
  }
}
