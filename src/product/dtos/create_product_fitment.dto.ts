import { IsArray, IsOptional, IsString } from 'class-validator';
import { CarMake } from 'src/common/modules/car/entities/car_make.entity';
import { CarModel } from 'src/common/modules/car/entities/car_model.entity';

export class CreateProductFitmentDto {
  @IsOptional()
  id: number;

  @IsString()
  make: CarMake;

  @IsArray()
  carType: string[];

  @IsString()
  carModel: CarModel;

  @IsString()
  variant: string;

  @IsArray()
  modelYear: number[];
}
