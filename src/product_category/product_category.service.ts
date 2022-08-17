import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product_category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepo: Repository<ProductCategory>,
  ) {}

  async getProductCategories() {
    try {
      const categories = await this.productCategoryRepo.find();
      if (!categories) {
        throw new NotFoundException();
      }
      return categories;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async prodcutCategoriesByParentId(productCategoryId: string) {
    try {
      const categories = await this.productCategoryRepo.find({
        where: { parentId: parseInt(productCategoryId) },
      });
      if (!categories) {
        throw new NotFoundException();
      }
      return categories;
    } catch (error) {
      throw new BadRequestException('');
    }
  }
}
