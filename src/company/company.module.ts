import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';
import { City } from './entities/city.entity';
import { CompanyBank } from './entities/company_bank.entity';
import { CompanyDocument } from './entities/company_document.entity';
import { CompanyStore } from './entities/company_store.entity';
import { Company } from './entities/company.entity';
import { Country } from './entities/country.entity';
import { DocumentType } from './entities/document_type.entity';
import { State } from './entities/state.entity';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forFeature([
      Bank,
      City,
      CompanyBank,
      CompanyDocument,
      CompanyStore,
      Company,
      Country,
      DocumentType,
      State,
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
