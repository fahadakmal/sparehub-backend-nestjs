import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateCompanyBankDto } from './creaate_company-bank.dto';
import { CreateCompanyBusinessDto } from './create_company-business-info.dto';
import { CreateCompanyDocumentDto } from './create_company_document.dto';
import { CreateCompanyStoreoDto } from './create_company_store.dto';

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
