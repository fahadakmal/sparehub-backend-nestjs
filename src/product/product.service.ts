import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create_product.dto';
import { Product } from './entities/product.entity';
import { ProductFitment } from './entities/product_fitment.entity';
import { ProductMedia } from './entities/product_media.entity';
import { ProductInventory } from './entities/product_inventory.entity';
import { User } from 'src/auth/entities/user.entity';
import { CompanyService } from 'src/company/company.service';
import { isArray } from 'class-validator';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepositery: Repository<Product>,
    private companyService: CompanyService,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<void> {
    try {
      const company = await this.companyService.getCompany(user);
      const product = this.productRepositery.create({
        ...createProductDto,
        company,
      });
      await this.productRepositery.save(product);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getProduct(productId: string): Promise<Product> {
    try {
      const query = this.productRepositery.createQueryBuilder('product');
      query.where('(product.id  = (:productId))', {
        productId: parseInt(productId),
      });
      query.leftJoinAndSelect('product.fitments', 'product_fitments');
      query.leftJoinAndSelect(
        'product.productToInventory',
        'productToInventory',
      );
      query.leftJoinAndSelect('product.mediaFiles', 'product_media');

      const product = await query.getOne();
      if (!product) {
        throw new NotFoundException();
      }
      return product;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
