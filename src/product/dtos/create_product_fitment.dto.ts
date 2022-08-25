import { IsOptional } from 'class-validator';

export class CreateProductFitmentDto {
  @IsOptional()
  id: number;
}
