import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './dtos/create_product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<void> {
    return this.productService.createProduct(createProductDto);
  }
}
