import {
  Controller,
  Get,
  UseGuards,
  Body,
  Post,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { AddressService } from './address.service';
import { CreateCountryDto } from './dtos/createCountry.dto';
import { City } from './entities/city.entity';
import { Country } from './entities/country.entity';
import { State } from './entities/state.entity';
@Controller('address')
@UseGuards(AwsCognitoGuard)
export class AddressController {
  constructor(private addressService: AddressService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/countries')
  getCountries(): Promise<Country[]> {
    return this.addressService.getCountries();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id/states')
  getStates(@Param('id') countryId: number): Promise<State[]> {
    return this.addressService.getStates(countryId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id/cities')
  getCities(@Param('id') stateId: number): Promise<City[]> {
    return this.addressService.getCities(stateId);
  }
}
