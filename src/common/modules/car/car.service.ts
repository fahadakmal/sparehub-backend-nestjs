import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarMake } from './entities/car_make.entity';
import { CarModel } from './entities/car_model.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarMake)
    private carMakeRepositery: Repository<CarMake>,
    @InjectRepository(CarModel)
    private carModelRepositery: Repository<CarModel>,
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

  async getMakerModels(makerId: string): Promise<CarModel[]> {
    try {
      const makerModels = await this.carModelRepositery.findBy({
        isActive: true,
        make: { id: parseInt(makerId) },
      });
      if (!makerModels) {
        throw new NotFoundException();
      }
      return makerModels;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
