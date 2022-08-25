import { IsOptional } from 'class-validator';

export class CreateProductMediaDto {
  @IsOptional()
  id: number;
}
