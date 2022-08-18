import {
  BadRequestException,
  Get,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductType } from './entities/prodouct_type.entity';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepositery: Repository<ProductType>,
  ) {}
  async getProductTypes(): Promise<ProductType[]> {
    try {
      const productTypes = await this.productTypeRepositery.findBy({
        isActive: true,
      });
      if (!productTypes) {
        throw new NotFoundException();
      }
      return productTypes;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
