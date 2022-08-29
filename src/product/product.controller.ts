import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get_user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { CreateProductDto } from './dtos/create_product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@UseGuards(AwsCognitoGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  createProduct(
    @GetUser() user: User,
    @Body() createProductDto: CreateProductDto,
  ): Promise<void> {
    return this.productService.createProduct(createProductDto, user);
  }

  @Get('/:productId')
  getProduct(@Param('productId') productId: string): Promise<Product> {
    return this.productService.getProduct(productId);
  }
}
