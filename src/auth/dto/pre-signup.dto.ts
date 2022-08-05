import { IsEmail, IsPhoneNumber } from 'class-validator';

export class PreSignUpDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNo: string;
}
