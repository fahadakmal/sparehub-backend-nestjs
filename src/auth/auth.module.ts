import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthorizeGuard } from './util/authoriseGaurd';
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService, AuthorizeGuard],
  controllers: [AuthController],
  exports: [AuthorizeGuard],
})
export class AuthModule {}
