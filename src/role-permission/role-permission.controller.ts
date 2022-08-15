import { Controller, Post } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';

@Controller('role-permission')
export class RolePermissionController {
  constructor(private roleService: RolePermissionService) {}

  @Post()
  createRolesAndPermissions() {
    return this.roleService.createRolesAndPermissions();
  }
}
