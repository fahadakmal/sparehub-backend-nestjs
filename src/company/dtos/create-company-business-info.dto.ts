import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

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
  cityId: number;
  @IsString()
  zipcode: string;
  @IsNumber()
  stateId: number;
  @IsString()
  country: string;
  @IsBoolean()
  saveAsDraft: boolean;
}
