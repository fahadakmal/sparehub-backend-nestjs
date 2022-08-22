import { IsOptional, IsString } from 'class-validator';

export class CreateProductBasicDetailDto {
  @IsOptional()
  id: number;

  @IsString()
  productName: string;

  @IsString()
  productNameAr: string;
}
