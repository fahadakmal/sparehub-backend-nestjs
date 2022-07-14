import { IsString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

export class OnSignUpDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNo: string;

  @IsString()
  awsUserName: string;
}
