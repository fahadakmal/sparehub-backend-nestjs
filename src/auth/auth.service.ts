import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OnSignUpDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { Company } from 'src/company/entities/company.entity';

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
    const userObj = new User();
    this.userRepositery.merge(userObj, { ...user, company });
    await this.userRepositery.save(userObj);
  }

  async getUser(username: string) {
    const user = await this.userRepositery.findOneBy({
      awsUserName: username,
    });
    return user;
  }
}
