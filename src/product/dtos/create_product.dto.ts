import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateProductBasicDetailDto } from './create_product_basic.dto';
import { CreateProductFitmentDto } from './create_product_fitment.dto';
import { CreateProductInventoryDto } from './create_product_inventory.dto';
import { CreateProductMediaDto } from './create_product_media.dto';

export class CreateProductDto {
  @ValidateNested()
  @Type(() => CreateProductBasicDetailDto)
  basicDetail: CreateProductBasicDetailDto;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProductInventoryDto)
  inventory: CreateProductInventoryDto[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProductFitmentDto)
  fitments: CreateProductFitmentDto[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProductMediaDto)
  mediaFiles: CreateProductMediaDto[];
}
