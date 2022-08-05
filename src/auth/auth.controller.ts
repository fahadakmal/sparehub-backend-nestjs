import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OnLoginDto } from './dto/on-login.dto';
import { OnSignUpDto } from './dto/on-signup.dto';
import { PreSignUpDto } from './dto/pre-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/onSignUp')
  signUp(@Body() onSignUpDto: OnSignUpDto): Promise<void> {
    return this.authService.onSignUp(onSignUpDto);
  }

  @Post('onLogin')
  onLogin(@Body() onLoginDto: OnLoginDto): Promise<void> {
    return this.authService.onLogin(onLoginDto);
  }

  @Post('preSignUp')
  preSignUp(@Body() preSignUpDto: PreSignUpDto): Promise<any> {
    return this.authService.preSignUp(preSignUpDto);
  }
}
