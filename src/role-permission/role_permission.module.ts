import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { RolePermissionController } from './role_permission.controller';
import { RolePermissionService } from './role_permission.service';

@Module({
  controllers: [RolePermissionController],
  imports: [TypeOrmModule.forFeature([Permission, Role])],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
