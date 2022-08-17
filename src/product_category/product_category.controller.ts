import { Controller, Get, Param } from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';

@Controller('product-category')
export class ProductCategoryController {
  constructor(private productCategoryService: ProductCategoryService) {}

  @Get()
  getProductCategories() {
    return this.productCategoryService.getProductCategories();
  }

  @Get('/:parentId')
  getProductCategoriesByParentId(@Param('parentId') parentId: string) {
    return this.productCategoryService.prodcutCategoriesByParentId(parentId);
  }
}
