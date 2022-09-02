import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OnSignUpDto } from './dto/on_signup.dto';
import { User } from './entities/user.entity';
import { Company } from 'src/company/entities/company.entity';
import { OnLoginDto } from './dto/on_login.dto';
import { LoginType } from 'src/common/constants/enums/loginType.enum';
import { PreSignUpDto } from './dto/pre_signup.dto';
import { UserRole } from './entities/user_role.entity';
import { RolePermissionService } from 'src/role-permission/role_permission.service';

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
    const { email, phoneNo, awsUserName, firstName, lastName, country } =
      onSignUpDto;
    if (!email && !phoneNo) {
      throw new ConflictException('Email Or mobile  Required');
    }
    const user = this.userRepositery.create({
      awsUsername: awsUserName,
      email: email,
      mobile: phoneNo,
      firstName: firstName || null,
      lastName: lastName || null,
      country: { countryCode: country },
    });
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
    try {
      const userObj = this.userRepositery.create({
        ...user,
        company: company,
      });
      await this.userRepositery.save(userObj);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUser(findUserObj) {
    try {
      const user = await this.userRepositery.findOneBy(findUserObj);
      if (!user) {
        throw new NotFoundException(
          `User with  ${JSON.stringify(findUserObj)} not found`,
        );
      }
      return user;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getUserCompanyId(user: User) {
    try {
      const userObj = await this.userRepositery.findOne({
        where: { awsUsername: user.awsUsername },
        loadRelationIds: true,
      });
      if (!userObj) {
        throw new NotFoundException(
          `User with  ${JSON.stringify(user.email)} not found`,
        );
      }
      const { company } = userObj;

      return company;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async onLogin(onLoginDto: OnLoginDto) {
    try {
      const { loginType, loginSuccess, attribute } = onLoginDto;
      const user: User =
        loginType === LoginType.EMAIL
          ? await this.getUser({ email: attribute })
          : await this.getUser({ mobile: attribute });
      if (loginSuccess) {
        user.failedLoginAttempts = 0;
        user.lastLogin = new Date();
      } else {
        user.failedLoginAttempts = user.failedLoginAttempts + 1;
      }
      const currentUser = await this.userRepositery.save(user);
      return {
        ...currentUser,
        isOnboardingCompleted: currentUser.isOnboardingCompleted,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async preSignUp(preSignUpDto: PreSignUpDto) {
    const { email, phoneNo } = preSignUpDto;
    const query = this.userRepositery.createQueryBuilder('user');
    query.where(
      '(LOWER(user.email) LIKE LOWER(:email) OR LOWER(user.mobile) LIKE LOWER(:phoneNo))',
      { email: `%${email}%`, phoneNo: `%${phoneNo}%` },
    );
    try {
      const user = await query.getOne();
      if (!user) {
        throw new NotFoundException('User Not Found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
