import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}