import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthorizeGuard } from 'src/auth/util/authoriseGaurd';

@Controller('seller')
@UseGuards(AuthorizeGuard)
export class SellerController {
  @Post('/saveApplication')
  saveApplication(@Body('username') username: string) {
    return username;
  }
}
