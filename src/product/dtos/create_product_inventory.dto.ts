import { IsNumber, IsObject, IsOptional } from 'class-validator';

export class CreateProductInventoryDto {
  @IsOptional()
  id: number;

  @IsNumber()
  quantity: number;

  @IsObject()
  store: object;
}
