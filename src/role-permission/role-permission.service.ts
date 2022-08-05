import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(Role)
    private roleRepositery: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepositery: Repository<Permission>,
  ) {}
  async createRolesAndPermissions() {
    const permission1 = this.permissionRepositery.create({
      permissionName: 'Add Seller Admin',
      description: 'Add Seller Admin',
    });

    await this.permissionRepositery.save(permission1);

    const permission2 = new Permission();
    permission2.permissionName = 'Update seller profile';
    permission2.description = 'update';
    await this.permissionRepositery.save(permission2);

    const role = new Role();
    role.roleName = 'Seller Admin';
    role.roleDescription = 'Seller ';
    role.permissions = [permission1, permission2];
    await this.roleRepositery.save(role);
  }
}
