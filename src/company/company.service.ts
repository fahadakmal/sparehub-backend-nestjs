import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';
import { Bank } from 'src/common/modules/bank/entities/bank.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dtos/create_company.dto';
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
    const { companyBank, ...rest } = createCompanyDto;
    try {
      const company = this.companyRepositery.create({
        ...rest,
      });
      await this.companyRepositery.save(company);
      if (companyBank) {
        const companyBankToSave = this.companyBankRepositery.create({
          ...companyBank,
        });
        await this.companyBankRepositery.save({
          ...companyBankToSave,
          company,
        });
      }

      await this.authService.updateUserForCompanny(user, company);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCompany(user: User) {
    try {
      const companyId: any = await this.authService.getUserCompanyId(user);

      const query = this.companyRepositery.createQueryBuilder('company');

      query.where('(company.id = :companyId)', { companyId: companyId });

      query
        .leftJoinAndSelect('company.city', 'city')
        .leftJoinAndSelect('company.country', 'country')
        .leftJoinAndSelect('company.state', 'state')

        .leftJoinAndSelect('company.documents', 'company_document')
        .leftJoinAndSelect('company_document.docType', 'document_type')

        .leftJoinAndSelect('company.stores', 'company_store')
        .leftJoinAndSelect('company_store.city', 'citi')
        .leftJoinAndSelect('company_store.country', 'countri')
        .leftJoinAndSelect('company_store.state', 'stote');

      const company = await query.getOne();
      if (!company) {
        throw new NotFoundException();
      }
      const query1 =
        this.companyBankRepositery.createQueryBuilder('company_bank');
      let companyBank = await query1
        .where('(company_bank.coId = :companyId)', { companyId: companyId })
        .leftJoinAndSelect('company_bank.bank', 'bank')
        .getOne();
      if (!companyBank) {
        companyBank = null;
      }

      return { ...company, companyBank: companyBank };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCompanyStores(companyId: string): Promise<CompanyStore[]> {
    try {
      const companyStores = await this.companyStoreRepositery.findBy({
        isActive: true,
        company: { id: parseInt(companyId) },
      });
      if (!companyStores) {
        throw new NotFoundException();
      }
      return companyStores;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
