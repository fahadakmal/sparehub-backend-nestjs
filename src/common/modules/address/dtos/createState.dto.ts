import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  stateName: string;

  @IsString()
  @IsNotEmpty()
  stateCode: string;

  @IsString()
  @IsNotEmpty()
  stateNameAr: string;

  @IsNumber()
  @IsNotEmpty()
  country: number;
}
