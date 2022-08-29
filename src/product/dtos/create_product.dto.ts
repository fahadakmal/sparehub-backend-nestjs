import { Type } from 'class-transformer';
import {
  ValidateNested,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateProductFitmentDto } from './create_product_fitment.dto';
import { CreateProductInventoryDto } from './create_product_inventory.dto';
import { CreateProductMediaDto } from './create_product_media.dto';
import { ProductStatus } from 'src/common/constants/enums/product_status.enum';
import { ProductCategory } from 'src/common/modules/product_category/entities/product_category.entity';
import { Company } from 'src/company/entities/company.entity';

export class CreateProductDto {
  @IsOptional()
  id: number;

  @IsString()
  productName: string;

  @IsString()
  productNameAr: string;

  @IsString()
  itemCode: string;

  @IsString()
  description: string;

  @IsString()
  descriptionAr: string;

  @IsNumber()
  salePrice: number;

  @IsNumber()
  salePriceNet: number;

  @IsNumber()
  discount: number;

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsString()
  sku: string;

  @IsString()
  barcode: string;

  @IsArray()
  categories: ProductCategory[];
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
