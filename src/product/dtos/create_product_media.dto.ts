import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductMediaDto {
  @IsOptional()
  id: number;

  @IsString()
  imageFileName: string;

  @IsString()
  imageData: string;

  @IsString()
  imagePath: string;

  @IsString()
  imageType: string;

  @IsNumber()
  sortOrder: number;
}
