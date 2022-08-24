import { IsOptional } from 'class-validator';

export class CreateProductInventoryDto {
  @IsOptional()
  id: number;
}
