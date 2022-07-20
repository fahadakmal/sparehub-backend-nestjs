import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dtos/createCountry.dto';
import { City } from './entities/city.entity';
import { Country } from './entities/country.entity';
import { State } from './entities/state.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Country)
    private countryRepositery: Repository<Country>,
    @InjectRepository(State)
    private stateRepositery: Repository<State>,
    @InjectRepository(City)
    private cityRepositery: Repository<City>,
  ) {}

  async getCountries(): Promise<Country[]> {
    try {
      const tasks = await this.countryRepositery.find();
      return tasks;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
