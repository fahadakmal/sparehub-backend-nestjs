import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdCategory } from './entities/prod_category.entity';
import { ProductCategoryController } from './product_category.controller';
import { ProductCategoryService } from './product_category.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProdCategory])],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
