import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateProductFitmentDto {
  @IsOptional()
  id: number;

  @IsObject()
  make: object;

  @IsOptional()
  @IsArray()
  carType: string[];

  @IsObject()
  model: object;

  @IsString()
  variant: string;

  @IsArray()
  modelYear: number[];
}
