import {
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepositery: Repository<User>,
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
    try {
      await this.userRepositery.save(user);
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
    this.userRepositery.save(user);
  }
}
