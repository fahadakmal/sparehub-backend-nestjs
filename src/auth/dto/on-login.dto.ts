import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { LoginType } from 'src/common/constants/enums/loginType.enum';

export class OnLoginDto {
  @IsString()
  attribute: string;

  @IsEnum(LoginType)
  loginType: LoginType;

  @IsBoolean()
  loginSuccess: boolean;
}
