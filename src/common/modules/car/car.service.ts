import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarMake } from './entities/car_make.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarMake)
    private carMakeRepositery: Repository<CarMake>,
  ) {}

  async getCarMakers(): Promise<CarMake[]> {
    try {
      const carMakers = await this.carMakeRepositery.findBy({ isActive: true });
      if (!carMakers) {
        throw new NotFoundException();
      }
      return carMakers;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
