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

  async getCarMakes(): Promise<CarMake[]> {
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

  async getMakeModels(make: string): Promise<CarModel[]> {
    try {
      const query = this.carModelRepositery.createQueryBuilder('car_model');

      query.where('(car_model.make iLike :make)', { make: `%${make}%` });
      query.select('car_model.model');
      const models = await query.getMany();
      if (!models) {
        throw new NotFoundException();
      }
      return models;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getModelVariants(model: string): Promise<CarModel> {
    try {
      const query = this.carModelRepositery.createQueryBuilder('car_model');
      query.where('(car_model.model iLike :model)', { model: model });
      query.select('car_model.variant');
      const variants = await query.getOne();
      if (!variants) {
        throw new NotFoundException();
      }
      return variants;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getModelCarTypes(model: string): Promise<CarModel> {
    try {
      const query = this.carModelRepositery.createQueryBuilder('car_model');
      query.where('(car_model.model iLike :model)', { model: model });
      query.select('car_model.carTypes');
      const carTypes = await query.getOne();
      if (!carTypes) {
        throw new NotFoundException();
      }
      return carTypes;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getModelYears(model: string): Promise<CarModel> {
    try {
      const query = this.carModelRepositery.createQueryBuilder('car_model');
      query.where('(car_model.model iLike :model)', { model: model });
      query.select('car_model.modelYear');
      const modelYear = await query.getOne();
      if (!modelYear) {
        throw new NotFoundException();
      }
      return modelYear;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
