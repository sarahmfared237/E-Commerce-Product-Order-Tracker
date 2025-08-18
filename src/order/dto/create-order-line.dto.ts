import { IsNotEmpty} from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrderLineDto {

  @IsNotEmpty()
  productID: Types.ObjectId;

  @IsNotEmpty()
  quantity: number;
  


}
