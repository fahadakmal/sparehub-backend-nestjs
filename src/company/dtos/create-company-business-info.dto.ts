import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { City } from 'src/common/modules/address/entities/city.entity';
import { State } from 'src/common/modules/address/entities/state.entity';

export class CreateCompanyBusinessDto {
  @IsOptional()
  id: number;
  @IsString()
  companyName: string;
  @IsString()
  companyNameAr: string;
  @IsString()
  displayName: string;
  @IsString()
  displayNameAr: string;
  @IsString()
  businessType: string;
  @IsString()
  registrationNo: string;
  @IsString()
  logo: string;
  @IsString()
  inchargeUsername: string;
  @IsString()
  email: string;
  @IsString()
  website: string;
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
  @IsBoolean()
  saveAsDraft: boolean;
}
