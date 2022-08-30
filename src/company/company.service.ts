import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';
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
    try {
      const company = this.companyRepositery.create({
        ...createCompanyDto,
      });
      await this.companyRepositery.save(company);
      await this.authService.updateUserForCompanny(user, company);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCompany(user: User) {
    try {
      const companyId: any = await this.authService.getUserCompanyId(user);
      const company = await this.companyRepositery.findOne({
        where: { id: companyId },
        relations: ['stores', 'bank', 'documents'],
      });
      if (!company) {
        throw new NotFoundException();
      }
      return company;
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
