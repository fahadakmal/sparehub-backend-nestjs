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
      const countries = await this.countryRepositery.find();
      return countries;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getStates(countryCode: string): Promise<State[]> {
    try {
      const states = await this.stateRepositery.find({
        where: { country: { countryCode: countryCode } },
      });
      return states;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getCities(stateCode: string): Promise<City[]> {
    try {
      const cities = await this.cityRepositery.find({
        where: { state: { stateCode: stateCode } },
      });
      return cities;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
