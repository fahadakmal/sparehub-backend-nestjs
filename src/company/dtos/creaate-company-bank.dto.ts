import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Bank } from 'src/common/modules/bank/entities/bank.entity';

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
  bank: Bank;
  @IsString()
  branchCode: string;
  @IsBoolean()
  saveAsDraft: boolean;
}
