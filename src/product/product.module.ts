import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductFitment } from './entities/product_fitment.entity';
import { ProductMedia } from './entities/product_media.entity';
import { ProductInventory } from './entities/product_inventory.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CompanyModule } from 'src/company/company.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductFitment,
      ProductMedia,
      ProductInventory,
    ]),
    CompanyModule,
    AuthModule,
    ConfigModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
