import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { Serialize } from 'src/common/interceptors/serialize.intercepter';
import { CarService } from './car.service';
import { CarMakeDto } from './dtos/car_make.dto';
import { CarModelDto } from './dtos/car_model.dto';
import { CarVariantDto } from './dtos/car_variant.dto';
import { CarMake } from './entities/car_make.entity';
import { CarModel } from './entities/car_model.entity';
import { CarModelYear } from './entities/car_model_year.entity';

@UseGuards(AwsCognitoGuard)
@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Serialize(CarMakeDto)
  @Get('/makers')
  getCarMakers(): Promise<CarMake[]> {
    return this.carService.getCarMakers();
  }
  @Serialize(CarModelDto)
  @Get('/maker/:makerId/models')
  getMakerModels(@Param('makerId') makerId: string): Promise<CarModel[]> {
    return this.carService.getMakerModels(makerId);
  }

  @Serialize(CarVariantDto)
  @Get('/model/:modelId/variants')
  getModelVariants(@Param('modelId') modelId: string): Promise<CarModelYear[]> {
    return this.carService.getModelVariants(modelId);
  }
}
