import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create_product.dto';
import { Product } from './entities/product.entity';
import { ProductFitment } from './entities/product_fitment.entity';
import { ProductMedia } from './entities/product_media.entity';
import { ProductInventory } from './entities/product_inventory.entity';
import { User } from 'src/auth/entities/user.entity';
import { CompanyService } from 'src/company/company.service';
import { isArray } from 'class-validator';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepositery: Repository<Product>,
    @InjectRepository(ProductFitment)
    private productFitmentRepositery: Repository<ProductFitment>,
    @InjectRepository(ProductMedia)
    private productMediaRepositery: Repository<ProductMedia>,
    @InjectRepository(ProductInventory)
    private productInventoryRepositery: Repository<ProductInventory>,
    private companyService: CompanyService,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    try {
      const company = await this.companyService.getCompany(user);
      const product = this.productRepositery.create({
        ...createProductDto.productBasicDetail,
        company,
      });
      await this.productRepositery.save(product);

      if (
        isArray(createProductDto.fitments) &&
        createProductDto.fitments.length > 0
      ) {
        for (const fitment of createProductDto.fitments) {
          const productFitment = this.productFitmentRepositery.create({
            ...fitment,
            product: product,
          });

          await this.productFitmentRepositery.save(productFitment);
        }
      }
      if (
        isArray(createProductDto.inventory) &&
        createProductDto.inventory.length > 0
      ) {
        for (const inventory of createProductDto.inventory) {
          const productInventory = this.productInventoryRepositery.create({
            ...inventory,
            product: product,
          });

          await this.productInventoryRepositery.save(productInventory);
        }
      }
      if (
        isArray(createProductDto.mediaFiles) &&
        createProductDto.mediaFiles.length > 0
      ) {
        for (const mediaFiles of createProductDto.mediaFiles) {
          const productMedia = this.productMediaRepositery.create({
            ...mediaFiles,
            product: product,
          });

          await this.productMediaRepositery.save(productMedia);
        }
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
