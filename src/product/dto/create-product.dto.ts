import { IsNotEmpty} from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  categoryid: Types.ObjectId;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  stock: number;
  
  @IsNotEmpty()
  imageURL: string;

}
