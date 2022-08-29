import { IsNumber, IsOptional } from 'class-validator';
import { CarMadeYear } from 'src/common/modules/car/entities/car_made_year.entity';
import { CarMake } from 'src/common/modules/car/entities/car_make.entity';
import { CarModel } from 'src/common/modules/car/entities/car_model.entity';
import { CarType } from 'src/common/modules/car/entities/car_type.entities';
import { CarVariant } from 'src/common/modules/car/entities/car_variant.entity';

export class CreateProductFitmentDto {
  @IsOptional()
  id: number;

  @IsNumber()
  carMake: CarMake;

  @IsNumber()
  carType: CarType;

  @IsNumber()
  carModel: CarModel;

  @IsNumber()
  carVariant: CarVariant;

  @IsNumber()
  carMadeYear: CarMadeYear;
}
