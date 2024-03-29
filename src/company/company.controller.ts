import { Controller, Post, UseGuards, Body, Get, Param } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get_user.decorator';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { User } from 'src/auth/entities/user.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/create_company.dto';
import { CompanyStore } from './entities/company_store.entity';
import { Serialize } from 'src/common/interceptors/serialize.intercepter';

@Controller('company')
@UseGuards(AwsCognitoGuard)
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  saveCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @GetUser() user: User,
  ) {
    return this.companyService.saveCompany(user, createCompanyDto);
  }

  @Get()
  getCompany(@GetUser() user: User) {
    return this.companyService.getCompany(user);
  }

  @Get('/:companyId/stores')
  getCompanyStores(
    @Param('companyId') companyId: string,
  ): Promise<CompanyStore[]> {
    return this.companyService.getCompanyStores(companyId);
  }
}
