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
import { User } from 'src/auth/entities/user.entity';
import { CompanyService } from 'src/company/company.service';

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
      throw new InternalServerErrorException(error.message);
    }
  }

  async getProduct(productId: string): Promise<Product> {
    try {
      const query = this.productRepositery.createQueryBuilder('product');
      query.where('(product.id  = (:productId))', {
        productId: parseInt(productId),
      });
      query.leftJoinAndSelect('product.fitments', 'product_fitment');
      query.leftJoinAndSelect('product_fitment.make', 'car_make');
      query.leftJoinAndSelect('product_fitment.model', 'car_model');

      query.leftJoinAndSelect(
        'product.productToInventory',
        'productToInventory',
      );
      query.leftJoinAndSelect('productToInventory.store', 'company_store');
      query.leftJoinAndSelect('product.images', 'product_image');
      query.leftJoinAndSelect('product.brand', 'brand');
      query.leftJoinAndSelect('product.categories', 'prod_category');

      const product = await query.getOne();
      if (!product) {
        throw new NotFoundException();
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
