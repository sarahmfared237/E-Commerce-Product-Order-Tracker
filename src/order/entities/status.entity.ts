import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StatusDocument = Status & Document;

@Schema({ timestamps: true })
export class Status {
  @Prop({ required: true, unique: true })
  name: string; 

  @Prop({ type: Types.ObjectId, ref: 'Status', default: null })
  nextStatusID: Types.ObjectId | null;
}

export const StatusSchema = SchemaFactory.createForClass(Status);


