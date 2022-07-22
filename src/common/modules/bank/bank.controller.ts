import {
  Controller,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
} from '@nestjs/common';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { BankService } from './bank.services';
import { Bank } from './entities/bank.entity';
@Controller('bank')
@UseGuards(AwsCognitoGuard)
export class BankController {
  constructor(private bankService: BankService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:country')
  getBanks(@Param('country') country: string): Promise<Bank[]> {
    return this.bankService.getBanks(country);
  }
}
