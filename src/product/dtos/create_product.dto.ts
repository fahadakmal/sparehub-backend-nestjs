import { Type } from 'class-transformer';
import {
  ValidateNested,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsObject,
  IsDecimal,
} from 'class-validator';
import { CreateProductFitmentDto } from './create_product_fitment.dto';
import { CreateProductInventoryDto } from './create_product_inventory.dto';
import { CreateProductMediaDto } from './create_product_images.dto';
import { ProductStatus } from 'src/common/constants/enums/product_status.enum';
import { ProdCategory } from 'src/common/modules/product_category/entities/prod_category.entity';

export class CreateProductDto {
  @IsOptional()
  id: number;

  @IsString()
  productName: string;

  @IsString()
  productNameAr: string;

  @IsOptional()
  @IsString()
  itemCode: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  descriptionAr: string;

  @IsOptional()
  @IsDecimal()
  salePrice: number;

  @IsOptional()
  @IsDecimal()
  salePriceNet: number;

  @IsOptional()
  @IsDecimal()
  discount: number;

  @IsOptional()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsOptional()
  @IsString()
  sku: string;

  @IsOptional()
  @IsString()
  barcode: string;

  @IsOptional()
  @IsObject()
  type: object;

  @IsArray()
  categories: object[];
  @ValidateNested({ each: true })
  @Type(() => CreateProductInventoryDto)
  inventory: CreateProductInventoryDto[];
  @ValidateNested({ each: true })
  @Type(() => CreateProductFitmentDto)
  fitments: CreateProductFitmentDto[];
  @ValidateNested({ each: true })
  @Type(() => CreateProductMediaDto)
  mediaFiles: CreateProductMediaDto[];
}
