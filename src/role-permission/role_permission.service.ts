import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async findSuperSellerAdmin() {
    try {
      const query = this.roleRepositery.createQueryBuilder('role');
      query.where('(role.roleName iLike :roleName)', {
        roleName: 'Seller Super Admin',
      });

      const role = await query.getOne();
      if (!role) {
        throw new NotFoundException();
      }
      return role;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
