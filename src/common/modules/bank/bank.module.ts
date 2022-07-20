import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BankController } from './bank.controller';
import { BankService } from './bank.services';
import { Bank } from './entities/bank.entity';

@Module({
  imports: [ConfigModule, AuthModule, TypeOrmModule.forFeature([Bank])],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
