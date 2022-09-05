import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { City } from 'src/common/modules/address/entities/city.entity';
import { Country } from 'src/common/modules/address/entities/country.entity';
import { State } from 'src/common/modules/address/entities/state.entity';

export class CreateCompanyStoreoDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  storeName: string;
  @IsString()
  @IsNotEmpty()
  storeDisplayName: string;
  @IsOptional()
  @IsString()
  address1: string;
  @IsOptional()
  @IsString()
  address2: string;
  @IsOptional()
  @IsObject()
  city: City;
  @IsOptional()
  @IsString()
  zipcode: string;
  @IsOptional()
  @IsObject()
  state: State;
  @IsOptional()
  @IsObject()
  country: Country;
  @IsOptional()
  @IsString()
  coordinates: string;
  @IsOptional()
  @IsString()
  inchargeUsername: string;
  @IsOptional()
  @IsString()
  storePhone: string;
}
