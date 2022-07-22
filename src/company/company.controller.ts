import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { User } from 'src/auth/user.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/create-company.dto';

@Controller('company')
@UseGuards(AwsCognitoGuard)
export class CompanyController {
  constructor(private companyService: CompanyService) {}
  @Post('/saveApplication')
  saveCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @GetUser() user: User,
  ) {
    return this.companyService.saveCompany(user, createCompanyDto);
  }
}
