import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { Serialize } from 'src/common/interceptors/serialize.intercepter';
import { CarService } from './car.service';
import { CarMakeDto } from './dtos/car_make.dto';
import { CarModelDto } from './dtos/car_model.dto';
import { CarMake } from './entities/car_make.entity';
import { CarModel } from './entities/car_model.entity';

@UseGuards(AwsCognitoGuard)
@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Serialize(CarMakeDto)
  @Get('/makes')
  getCarMakes(): Promise<CarMake[]> {
    return this.carService.getCarMakes();
  }

  @Get('/:model/carTypes')
  getModelCarTypes(@Param('model') model: string): Promise<CarModel[]> {
    return this.carService.getModelCarTypes(model);
  }

  @Serialize(CarModelDto)
  @Get('/:make/models')
  getMakeModels(@Param('make') make: string): Promise<CarModel[]> {
    return this.carService.getMakeModels(make);
  }

  @Get('/:model/variants')
  getModelVariants(@Param('model') model: string): Promise<CarModel[]> {
    return this.carService.getModelVariants(model);
  }

  @Get('/:model/years')
  getModelYears(@Param('model') model: string): Promise<CarModel[]> {
    return this.carService.getModelYears(model);
  }
}
