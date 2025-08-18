import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { OrderLine, OrderLineSchema } from './entities/order-line.entity';
import { Status, StatusSchema } from './entities/status.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';

@Module({
  imports: [      
    AuthModule,
    MongooseModule.forFeature([
        { name: Order.name, schema: OrderSchema },
        { name: OrderLine.name, schema: OrderLineSchema },
        { name: Status.name, schema: StatusSchema },
        { name: Product.name, schema: ProductSchema }
    ]),
    ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
