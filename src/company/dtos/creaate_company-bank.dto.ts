import { Expose } from 'class-transformer';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Bank } from 'src/common/modules/bank/entities/bank.entity';

export class CreateCompanyBankDto {
  @IsOptional()
  id: number;
  @IsString()
  @IsNotEmpty()
  accountTitle: string;
  @IsOptional()
  @IsString()
  accountNo: string;
  @IsOptional()
  @IsString()
  iban: string;
  @IsOptional()
  @IsObject()
  bank: Bank;
  @IsOptional()
  @IsString()
  branchCode: string;
}
