import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OnSignUpDto } from './dto/on-signup.dto';
import { User } from './entities/user.entity';
import { Company } from 'src/company/entities/company.entity';
import { OnLoginDto } from './dto/on-login.dto';
import { LoginType } from 'src/common/constants/enums/loginType.enum';
import { PreSignUpDto } from './dto/pre-signup.dto';
import { UserRole } from './entities/user-role.entity';
import { RolePermissionService } from 'src/role-permission/role-permission.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepositery: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleepositery: Repository<UserRole>,
    private roleService: RolePermissionService,
  ) {}

  async onSignUp(onSignUpDto: OnSignUpDto): Promise<void> {
    const { email, phoneNo, awsUserName } = onSignUpDto;
    if (!email && !phoneNo) {
      throw new ConflictException('Email Or Phone No  Required');
    }
    const userObj = { awsUserName: awsUserName };
    if (email) {
      userObj['email'] = email;
    }
    if (phoneNo) {
      userObj['phoneNo'] = phoneNo;
    }
    const user = this.userRepositery.create({ ...userObj });
    const supersellerRoleawait = await this.roleService.findSuperSellerAdmin();
    try {
      const savedUser = await this.userRepositery.save(user);
      const userRoleEntry = this.userRoleepositery.create({
        assignedBy: 1,
        user: savedUser,
        role: supersellerRoleawait,
      });
      this.userRoleepositery.save(userRoleEntry);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateUserForCompanny(user: User, company: Company) {
    const userObj = this.userRepositery.create({
      ...user,
      company: company,
    });
    await this.userRepositery.save(userObj);
  }

  async getUser(findUserObj) {
    const user = await this.userRepositery.findOneBy(findUserObj);
    if (!user) {
      throw new NotFoundException(
        `User with  ${JSON.stringify(findUserObj)} not found`,
      );
    }
    return user;
  }

  async getUserCompanyId(user: User) {
    const userObj = await this.userRepositery.findOne({
      where: { id: user.id },
      loadRelationIds: true,
    });

    const { company } = userObj;

    return company;
  }

  async onLogin(onLoginDto: OnLoginDto) {
    try {
      const { loginType, loginSuccess, attribute } = onLoginDto;
      const user: User =
        loginType === LoginType.EMAIL
          ? await this.getUser({ email: attribute })
          : await this.getUser({ phoneNo: attribute });
      if (loginSuccess) {
        user.failedLoginAttempts = 0;
        user.lastLogin = new Date();
      } else {
        user.failedLoginAttempts = user.failedLoginAttempts + 1;
      }
      const currentUser = this.userRepositery.save(user);
      return currentUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async preSignUp(preSignUpDto: PreSignUpDto) {
    const { email, phoneNo } = preSignUpDto;
    try {
      const user = await this.userRepositery.findOneBy({ email, phoneNo });
      if (!user) {
        throw new NotFoundException('User Not Found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
