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
      permissionName: 'Add Sparehub Admin',
      description: 'Can add, edit, remove Sparehub admins',
      module: 'SPAREHUB',
    });

    await this.permissionRepositery.save(permission1);

    const permission2 = new Permission();
    permission2.permissionName = 'Add Seller Admins';
    permission2.description = 'Update seller profile. Add users';
    permission2.module = 'SPAREHUB';
    await this.permissionRepositery.save(permission2);

    const permission3 = new Permission();
    permission3.permissionName = 'Add Products';
    permission3.description = 'Add, edit products';
    permission3.module = 'SPAREHUB';
    await this.permissionRepositery.save(permission3);
    const permission4 = new Permission();
    permission4.permissionName = 'Publish Products';
    permission4.description = 'Publish, unpublish products';
    permission4.module = 'SPAREHUB';
    await this.permissionRepositery.save(permission4);
    const permission5 = new Permission();
    permission5.permissionName = 'Orders View';
    permission5.description = 'Order listing and view details';
    permission5.module = 'SPAREHUB';
    await this.permissionRepositery.save(permission5);
    const permission6 = new Permission();
    permission6.permissionName = 'Order package';
    permission6.description = 'Change order status, cancel, package, deliver';
    permission6.module = 'SPAREHUB';
    await this.permissionRepositery.save(permission6);
    const permission7 = new Permission();
    permission7.permissionName = 'Reviews Reply';
    permission7.description = 'View and reply against reviews and questions';
    permission7.module = 'SPAREHUB';
    await this.permissionRepositery.save(permission7);
    const permission8 = new Permission();
    permission8.permissionName = 'Review Delete';
    permission8.description = 'Review delete';
    permission8.module = 'SPAREHUB';
    await this.permissionRepositery.save(permission8);

    const role = new Role();
    role.roleName = 'Sparehub Admin';
    role.roleDescription = 'Seller ';
    role.permissions = [permission1];
    role.module = 'SPAREHUB';

    await this.roleRepositery.save(role);

    const role1 = new Role();
    role1.roleName = 'Seller Admin';
    role1.module = 'SPAREHUB';
    role1.permissions = [permission2];

    await this.roleRepositery.save(role1);

    const role2 = new Role();
    role2.roleName = 'Product Catalog';
    role2.module = 'SPAREHUB';
    role2.permissions = [permission3, permission4];

    await this.roleRepositery.save(role2);

    const role3 = new Role();
    role3.roleName = 'Order Processor';
    role3.module = 'SPAREHUB';
    role3.permissions = [permission5, permission6];

    await this.roleRepositery.save(role3);

    const role4 = new Role();
    role4.roleName = 'Review Mgr';
    role4.module = 'SPAREHUB';
    role4.permissions = [permission7, permission8];

    await this.roleRepositery.save(role4);

    const role5 = new Role();
    role5.roleName = 'Seller Super Admin';
    role5.module = 'SPAREHUB';
    role5.permissions = [
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
      permission7,
      permission8,
    ];

    await this.roleRepositery.save(role5);
  }

  async findSuperSellerAdmin() {
    return this.roleRepositery.findOneBy({ id: 6 });
  }
}
