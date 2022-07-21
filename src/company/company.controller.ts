import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { CompanyService } from './company.service';

@Controller('company')
@UseGuards(AwsCognitoGuard)
export class CompanyController {
  constructor(private companyService: CompanyService) {}
  @Post('/saveApplication')
  saveCompany(@Body('username') username: string, @Body('data') data: any) {
    return this.companyService.saveCompany(username, data);
  }
}
