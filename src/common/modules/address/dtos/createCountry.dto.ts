import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  countryName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?:de|fr|es)$/i, {
    message: 'Country Code is not correct',
  })
  countryCode: string;

  @IsString()
  @IsNotEmpty()
  countryNameAr: string;
}
