import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OnSignUpDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
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
    const user = this.user.create({ ...userObj });
    try {
      await this.user.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
