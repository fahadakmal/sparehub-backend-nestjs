import { Controller, Get, UseGuards } from '@nestjs/common';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { Serialize } from 'src/common/interceptors/serialize.intercepter';
import { ProductTypeDto } from './dtos/product_type.dto';
import { ProductType } from './entities/prodouct_type.entity';
import { ProductTypeService } from './product_type.service';

@UseGuards(AwsCognitoGuard)
@Controller('product-type')
export class ProductTypeController {
  constructor(private productTypeService: ProductTypeService) {}

  @Serialize(ProductTypeDto)
  @Get()
  getProductTypes(): Promise<ProductType[]> {
    return this.productTypeService.getProductTypes();
  }
}
