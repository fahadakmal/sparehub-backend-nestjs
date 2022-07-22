import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { Company } from './entities/company.entity';
import { CompanyBank } from './entities/company_bank.entity';
import { CompanyDocument } from './entities/company_document.entity';
import { CompanyStore } from './entities/company_store.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepositery: Repository<Company>,
    @InjectRepository(CompanyBank)
    private companyBankRepositery: Repository<CompanyBank>,
    @InjectRepository(CompanyDocument)
    private companyDocumentRepositery: Repository<CompanyDocument>,
    @InjectRepository(CompanyStore)
    private companyStoreRepositery: Repository<CompanyStore>,
    private authService: AuthService,
  ) {}

  async saveCompany(user: User, createCompanyDto: CreateCompanyDto) {
    try {
      const company = new Company();
      this.companyRepositery.merge(company, createCompanyDto.businessInfo);
      await this.companyRepositery.save(company);
      await this.authService.updateUserForCompanny(user, company);
      if (createCompanyDto.bank) {
        const companyBank = new CompanyBank();
        this.companyBankRepositery.merge(companyBank, createCompanyDto.bank);
        await this.companyBankRepositery.save(companyBank);
        company.bank = companyBank;
        await this.companyRepositery.save(company);
      }

      if (createCompanyDto.stores) {
        for (const store of createCompanyDto.stores) {
          const companyStore = new CompanyStore();
          companyStore.company = company;
          this.companyStoreRepositery.merge(companyStore, store);
          await this.companyStoreRepositery.save(companyStore);
        }
      }

      if (createCompanyDto.documents) {
        for (const document of createCompanyDto.documents) {
          const companyDocument = new CompanyDocument();
          companyDocument.company = company;
          this.companyDocumentRepositery.merge(companyDocument, document);
          await this.companyDocumentRepositery.save(companyDocument);
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCompany(user: User) {
    return this.companyRepositery.findOneBy({ id: user.company.id });
  }
}
