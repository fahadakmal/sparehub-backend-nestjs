import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';

@Controller('company')
@UseGuards(AwsCognitoGuard)
export class CompanyController {
  @Post('/saveApplication')
  saveApplication(@Body('username') username: string) {
    return username;
  }
}