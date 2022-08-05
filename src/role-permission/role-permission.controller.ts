import { Controller, Post } from '@nestjs/common';

@Controller('role-permission')
export class RolePermissionController {
  @Post()
  createRolesAndPermissions() {}
}
