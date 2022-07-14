import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OnSignUpDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/onSignUp')
  signUp(@Body() onSignUpDto: OnSignUpDto): Promise<void> {
    return this.authService.onSignUp(onSignUpDto);
  }
}
