import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateCompanyBankDto } from './creaate-company-bank.dto';
import { CreateCompanyBusinessDto } from './create-company-business-info.dto';
import { CreateCompanyDocumentDto } from './create-company-document.dto';
import { CreateCompanyStoreoDto } from './create-company-store.dto';

export class CreateCompanyDto {
  @ValidateNested()
  @Type(() => CreateCompanyBusinessDto)
  businessInfo: CreateCompanyBusinessDto;
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCompanyBankDto)
  bank: CreateCompanyBankDto;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCompanyDocumentDto)
  documents: CreateCompanyDocumentDto[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCompanyStoreoDto)
  stores: CreateCompanyStoreoDto[];
}
