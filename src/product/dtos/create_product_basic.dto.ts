import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductStatus } from 'src/common/constants/enums/product_status.enum';
import { ProductCategory } from 'src/common/modules/product_category/entities/product_category.entity';
import { Company } from 'src/company/entities/company.entity';

export class CreateProductBasicDetailDto {
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

  @IsNumber()
  company: Company;

  @IsArray()
  categories: ProductCategory[];
}
