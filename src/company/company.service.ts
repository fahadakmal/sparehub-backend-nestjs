import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
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
    @InjectRepository(User)
    private userRepositery: Repository<User>,
  ) {}

  async saveCompany(username: string, createCompanyDto: any) {
    try {
      const company = new Company();
      this.companyRepositery.merge(company, createCompanyDto.company);
      await this.companyRepositery.save(company);
      await this.userRepositery.update(
        { awsUserName: username },
        { company: company },
      );
      if (createCompanyDto.companyBank) {
        const companyBank = new CompanyBank();
        this.companyBankRepositery.merge(
          companyBank,
          createCompanyDto.companyBank,
        );
        await this.companyBankRepositery.save(companyBank);
        company.bank = companyBank;
      }

      if (createCompanyDto.companyStores) {
        for (const store of createCompanyDto.companyStores) {
          const companyStore = new CompanyStore();
          companyStore.company = company;
          this.companyStoreRepositery.merge(companyStore, store);
          await this.companyStoreRepositery.save(companyStore);
        }
      }

      if (createCompanyDto.companyDocuments) {
        for (const store of createCompanyDto.companyDocuments) {
          const companyDocument = new CompanyDocument();
          companyDocument.company = company;
          this.companyDocumentRepositery.merge(companyDocument, store);
          await this.companyDocumentRepositery.save(companyDocument);
        }
      }
      await this.companyRepositery.save(company);
    } catch (error) {
      console.log(
        '🚀 ~ file: company.service.ts ~ line 68 ~ CompanyService ~ saveCompany ~ error',
        error,
      );
      throw new Error(`${error.message}`);
    }
  }
}
