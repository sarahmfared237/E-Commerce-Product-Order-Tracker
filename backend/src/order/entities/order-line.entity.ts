import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import { Order } from './order.entity';

export type OrderLineDocument = OrderLine & Document;

@Schema()
export class OrderLine {
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  order: Order;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Product;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  priceSnapshot: number;

}

export const OrderLineSchema = SchemaFactory.createForClass(OrderLine);





