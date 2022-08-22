import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create_product.dto';
import { Product } from './entities/product.entity';
import { ProductFitment } from './entities/product_fitment.entity';
import { ProductMedia } from './entities/product_image.entity';
import { ProductInventory } from './entities/product_inventory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepositery: Repository<Product>,
    @InjectRepository(ProductFitment)
    private productFitmentRepositery: Repository<ProductFitment>,
    @InjectRepository(ProductMedia)
    private productMediaRepositery: Repository<ProductMedia>,
    @InjectRepository(ProductInventory)
    private productInventoryRepositery: Repository<ProductInventory>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<void> {
    try {
      //   const product = this.productRepositery.create({
      //     ...createProductDto.productBasicDetail,
      //   });
      //   await this.productRepositery.save(product);
      //   return product;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
