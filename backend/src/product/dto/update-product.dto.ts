import { IsNotEmpty} from 'class-validator';
import { Category } from '../entities/category.entity';

export class UpdateProductDto {

  name: string;

  categoryID: string;
  
  price: number;

  description: string;

  stock: number;
  
  imageUrl: string;

}
