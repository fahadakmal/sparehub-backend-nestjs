import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductStatus } from 'src/common/constants/enums/product_status.enum';
import { SortingOrder } from 'src/common/constants/enums/sortingOrder.enum';
export class GetProductsFilterDto {
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  orderCol?: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;

  @IsOptional()
  @IsEnum(SortingOrder)
  order?: SortingOrder;
}
