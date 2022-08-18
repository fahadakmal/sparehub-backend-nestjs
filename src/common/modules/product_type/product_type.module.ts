import { Module } from '@nestjs/common';
import { ProductTypeService } from './product_type.service';
import { ProductTypeController } from './product_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from './entities/prodouct_type.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType]), ConfigModule, AuthModule],
  providers: [ProductTypeService],
  controllers: [ProductTypeController],
})
export class ProductTypeModule {}
