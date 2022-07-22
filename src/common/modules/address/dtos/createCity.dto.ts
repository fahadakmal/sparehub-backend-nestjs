import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCityDto {
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
