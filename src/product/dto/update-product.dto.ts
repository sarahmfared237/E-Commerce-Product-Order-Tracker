import { IsNotEmpty} from 'class-validator';
import { Category } from '../entities/category.entity';

export class UpdateProductDto {

  name: string;

  categoryid: string;
  
  price: number;

  description: string;

  stock: number;
  
  imageUrl: string;

}
