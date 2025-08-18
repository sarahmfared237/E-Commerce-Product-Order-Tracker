import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Status } from './status.entity';
import { User } from 'src/auth/entities/user.entity';
import { OrderLine } from './order-line.entity';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  total: number;

  @Prop({ type: Types.ObjectId, ref: 'Status', required: true })
  status: Status;
  
  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderLine' }] })
  orderLines: OrderLine[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);





