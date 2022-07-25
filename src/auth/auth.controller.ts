import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OnLoginDto } from './dto/on-login.dto';
import { OnSignUpDto } from './dto/on-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/onSignUp')
  signUp(@Body() onSignUpDto: OnSignUpDto): Promise<void> {
    return this.authService.onSignUp(onSignUpDto);
  }

  @Post('onLogin')
  onLogin(@Body() onLoginDto: OnLoginDto): Promise<void> {
    return this, this.authService.onLogin(onLoginDto);
  }
}
