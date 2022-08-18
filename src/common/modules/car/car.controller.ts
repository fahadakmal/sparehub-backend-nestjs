import { Controller, Get, UseGuards } from '@nestjs/common';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { Serialize } from 'src/common/interceptors/serialize.intercepter';
import { CarService } from './car.service';
import { CarMakeDto } from './dtos/car_make.dto';
import { CarMake } from './entities/car_make.entity';

@UseGuards(AwsCognitoGuard)
@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Serialize(CarMakeDto)
  @Get('/makers')
  getCarMakers(): Promise<CarMake[]> {
    return this.carService.getCarMakers();
  }
}
