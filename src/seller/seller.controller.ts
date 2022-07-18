import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';

@Controller('seller')
@UseGuards(AwsCognitoGuard)
export class SellerController {
  @Post('/saveApplication')
  saveApplication(@Body('username') username: string) {
    return username;
  }
}
