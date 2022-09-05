import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private bankRepositery: Repository<Bank>,
  ) {}
  async getBanks(countryCode: string): Promise<Bank[]> {
    try {
      const banks = await this.bankRepositery.find({
        where: { country: { countryCode: countryCode } },
      });
      if (!banks) {
        throw new NotFoundException();
      }
      return banks;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
