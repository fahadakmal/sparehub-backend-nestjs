import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private bankRepositery: Repository<Bank>,
  ) {}
  async getBanks(countryId: number): Promise<Bank[]> {
    try {
      const banks = await this.bankRepositery.find({
        where: { country: { id: countryId } },
      });
      return banks;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
