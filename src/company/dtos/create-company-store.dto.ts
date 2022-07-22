import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { City } from 'src/common/modules/address/entities/city.entity';
import { State } from 'src/common/modules/address/entities/state.entity';

export class CreateCompanyStoreoDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  storeName: string;
  @IsString()
  storeDisplayName: string;
  @IsString()
  address1: string;
  @IsString()
  address2: string;
  @IsNumber()
  city: City;
  @IsString()
  zipcode: string;
  @IsNumber()
  state: State;
  @IsString()
  country: string;
  @IsString()
  coordinates: string;
  @IsString()
  inchargeUsername: string;
  @IsString()
  storePhone: string;
  @IsBoolean()
  saveAsDraft: boolean;
}
