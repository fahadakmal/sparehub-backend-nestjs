import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateCountryDto {
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
