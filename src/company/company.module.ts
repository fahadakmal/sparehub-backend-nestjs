import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyBank } from './entities/company_bank.entity';
import { CompanyDocument } from './entities/company_document.entity';
import { CompanyStore } from './entities/company_store.entity';
import { Company } from './entities/company.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forFeature([
      CompanyBank,
      CompanyDocument,
      CompanyStore,
      Company,
      User,
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
