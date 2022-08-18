import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepositery: Repository<Brand>,
  ) {}

  async getBrands(): Promise<Brand[]> {
    try {
      const brands = await this.brandRepositery.findBy({ isActive: true });
      if (!brands) {
        throw new NotFoundException();
      }
      return brands;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
