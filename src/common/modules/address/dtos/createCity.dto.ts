import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  cityName: string;

  @IsString()
  @IsNotEmpty()
  cityNameAr: string;

  @IsNumber()
  @IsNotEmpty()
  state: string;
}
