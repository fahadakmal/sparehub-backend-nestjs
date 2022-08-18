import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get_user.decorator';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { User } from 'src/auth/entities/user.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/create_company.dto';

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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getCompany(@GetUser() user: User) {
    return this.companyService.getCompany(user);
  }
}
