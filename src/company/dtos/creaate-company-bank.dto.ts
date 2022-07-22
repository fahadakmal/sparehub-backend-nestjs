import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCompanyBankDto {
  @IsOptional()
  id: number;
  @IsString()
  accountTitle: string;
  @IsString()
  accountNo: string;
  @IsString()
  iban: string;
  @IsNumber()
  bankId: number;
  @IsString()
  branchCode: string;
  @IsBoolean()
  saveAsDraft: boolean;
}
