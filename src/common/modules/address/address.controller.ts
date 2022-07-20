import { Controller, Get, UseGuards, Body, Post, Param } from '@nestjs/common';
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

  @Get('/countries')
  getCountries(): Promise<Country[]> {
    return this.addressService.getCountries();
  }
}
