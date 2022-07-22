import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

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
  cityId: number;
  @IsString()
  zipcode: string;
  @IsNumber()
  stateId: number;
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
