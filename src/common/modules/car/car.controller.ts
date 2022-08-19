import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { Serialize } from 'src/common/interceptors/serialize.intercepter';
import { CarService } from './car.service';
import { CarMadeYearDto } from './dtos/car_made_year.dto';
import { CarMakeDto } from './dtos/car_make.dto';
import { CarModelDto } from './dtos/car_model.dto';
import { CarTypeDto } from './dtos/car_type.dto';
import { CarVariantDto } from './dtos/car_variant.dto';
import { CarMadeYear } from './entities/car_made_year.entity';
import { CarMake } from './entities/car_make.entity';
import { CarModel } from './entities/car_model.entity';
import { CarType } from './entities/car_type.entities';
import { CarVariant } from './entities/car_variant.entity';

@UseGuards(AwsCognitoGuard)
@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Serialize(CarMakeDto)
  @Get('/makers')
  getCarMakers(): Promise<CarMake[]> {
    return this.carService.getCarMakers();
  }

  @Serialize(CarTypeDto)
  @Get('/maker/:makerId/types')
  getMakerTypes(@Param('makerId') makerId: string): Promise<CarType[]> {
    return this.carService.getMakerTypes(makerId);
  }

  @Serialize(CarModelDto)
  @Get('/maker/:typeId/models')
  getMakerModels(@Param('typeId') typeId: string): Promise<CarModel[]> {
    return this.carService.getTypeModels(typeId);
  }

  @Serialize(CarVariantDto)
  @Get('/model/:modelId/variants')
  getModelVariants(@Param('modelId') modelId: string): Promise<CarVariant[]> {
    return this.carService.getModelVariants(modelId);
  }

  @Serialize(CarMadeYearDto)
  @Get('/variant/:variantId/made_years')
  getVariantMadeYears(
    @Param('variantId') variantId: string,
  ): Promise<CarMadeYear[]> {
    return this.carService.getVariantMadeYears(variantId);
  }
}
