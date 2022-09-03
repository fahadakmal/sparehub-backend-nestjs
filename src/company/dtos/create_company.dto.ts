import { Expose, Type } from 'class-transformer';
import {
  ValidateNested,
  IsOptional,
  IsString,
  IsEnum,
  IsNotEmpty,
  IsObject,
} from 'class-validator';
import { CreateCompanyBankDto } from './creaate_company-bank.dto';
import { CreateCompanyDocumentDto } from './create_company_document.dto';
import { CreateCompanyStoreoDto } from './create_company_store.dto';
import { City } from 'src/common/modules/address/entities/city.entity';
import { Country } from 'src/common/modules/address/entities/country.entity';
import { State } from 'src/common/modules/address/entities/state.entity';
import { CompanyStatus } from 'src/common/constants/enums/save_company.enum';

export class CreateCompanyDto {
  @IsOptional()
  id: number;
  @IsString()
  @IsNotEmpty()
  companyName: string;
  @IsString()
  @IsNotEmpty()
  companyNameAr: string;
  @IsOptional()
  @IsString()
  displayName: string;
  @IsOptional()
  @IsString()
  displayNameAr: string;
  @IsOptional()
  @IsString()
  businessType: string;
  @IsOptional()
  @IsString()
  registrationNo: string;
  @IsOptional()
  @IsString()
  logo: string;
  @IsOptional()
  @IsString()
  inchargeUsername: string;
  @IsOptional()
  @IsString()
  email: string;
  @IsOptional()
  @IsString()
  website: string;
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
  @IsEnum(CompanyStatus)
  status: CompanyStatus;
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCompanyBankDto)
  companyBank: CreateCompanyBankDto;
  @ValidateNested({ each: true })
  @Type(() => CreateCompanyDocumentDto)
  documents: CreateCompanyDocumentDto[];
  @ValidateNested({ each: true })
  @Type(() => CreateCompanyStoreoDto)
  stores: CreateCompanyStoreoDto[];
}
