import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdCategory } from './entities/prod_category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProdCategory)
    private prodCategoryRepo: Repository<ProdCategory>,
  ) {}

  async getProductCategories() {
    try {
      const categories = await this.prodCategoryRepo.find();
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
      const categories = await this.prodCategoryRepo.find({
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
