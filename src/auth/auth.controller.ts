import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { OnLoginDto } from './dto/on_login.dto';
import { OnSignUpDto } from './dto/on_signup.dto';
import { PreSignUpDto } from './dto/pre_signup.dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/onSignUp')
  signUp(@Body() onSignUpDto: OnSignUpDto): Promise<void> {
    return this.authService.onSignUp(onSignUpDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('onLogin')
  onLogin(@Body() onLoginDto: OnLoginDto): Promise<User> {
    return this.authService.onLogin(onLoginDto);
  }

  @Post('preSignUp')
  preSignUp(@Body() preSignUpDto: PreSignUpDto): Promise<any> {
    return this.authService.preSignUp(preSignUpDto);
  }
}
