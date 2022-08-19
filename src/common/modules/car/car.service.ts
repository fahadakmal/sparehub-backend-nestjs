import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarMadeYear } from './entities/car_made_year.entity';
import { CarMake } from './entities/car_make.entity';
import { CarModel } from './entities/car_model.entity';
import { CarType } from './entities/car_type.entities';
import { CarVariant } from './entities/car_variant.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarMake)
    private carMakeRepositery: Repository<CarMake>,
    @InjectRepository(CarModel)
    private carModelRepositery: Repository<CarModel>,
    @InjectRepository(CarVariant)
    private carVariantRepositery: Repository<CarVariant>,
    @InjectRepository(CarType)
    private carTypeRepositery: Repository<CarType>,
    @InjectRepository(CarMadeYear)
    private carMadeYearRepositery: Repository<CarMadeYear>,
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

  async getMakerTypes(makerId: string): Promise<CarType[]> {
    try {
      const carTypes = await this.carTypeRepositery.findBy({
        isActive: true,
        make: { id: parseInt(makerId) },
      });
      if (!carTypes) {
        throw new NotFoundException();
      }
      return carTypes;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getTypeModels(typeId: string): Promise<CarModel[]> {
    try {
      const typeModels = await this.carModelRepositery.findBy({
        isActive: true,
        carType: { id: parseInt(typeId) },
      });
      if (!typeModels) {
        throw new NotFoundException();
      }
      return typeModels;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getModelVariants(modelId: string): Promise<CarVariant[]> {
    try {
      const modelVariants = await this.carVariantRepositery.findBy({
        model: { id: parseInt(modelId) },
      });
      if (!modelVariants) {
        throw new NotFoundException();
      }
      return modelVariants;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getVariantMadeYears(variantId: string): Promise<CarMadeYear[]> {
    try {
      const variantMadeYears = await this.carMadeYearRepositery.findBy({
        variant: { id: parseInt(variantId) },
      });
      if (!variantMadeYears) {
        throw new NotFoundException();
      }
      return variantMadeYears;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
