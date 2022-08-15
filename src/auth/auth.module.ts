import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AwsCognitoGuard } from './guards/awsCognito.guard';
import { UserRole } from './entities/user-role.entity';
import { RolePermissionModule } from 'src/role-permission/role-permission.module';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, UserRole]),
    RolePermissionModule,
  ],
  providers: [AuthService, AwsCognitoGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
