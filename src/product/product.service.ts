// src/product/product.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { Category, CategoryDocument } from './entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,

    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  // Create Product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Ensure category exists
    console.log('Creating product with category ID:', createProductDto.categoryid);
    const category = await this.categoryModel.findById(
      createProductDto.categoryid,
    );
    if (!category) {
      throw new BadRequestException('Invalid category ID');
    }
  
    const newProduct = new this.productModel({
      ...createProductDto,
      category: new Types.ObjectId(createProductDto.categoryid as any),
    });

    return (await newProduct.save()).populate('category');
  }

  // Get All Products (with category populated)
  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('category').exec();
  }

  // Get One Product by ID
  async findOne(id: string): Promise<Product> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID');
    }

    const product = await this.productModel
      .findById(id)
      .populate('category')
      .exec();

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return product;
  }

  // Update Product
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID');
    }
    const updateData: any = { ...updateProductDto };
    if (updateProductDto.categoryid) {
      const categoryExists = await this.categoryModel.findById(
        updateProductDto.categoryid,
      );
      if (!categoryExists) {
        throw new BadRequestException('Invalid category ID');
      }
      updateData.category = new Types.ObjectId(updateProductDto.categoryid);
    }
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('category')
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return updatedProduct;
  }

  // Delete Product
  async remove(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID');
    }

    const deleted = await this.productModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return { message: `Product with ID "${id}" removed successfully` };
  }
}
