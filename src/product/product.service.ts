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
  ): Promise<void> {
    try {
      const { inventory, fitments, mediaFiles, ...rest } = createProductDto;
      const company = await this.companyService.getCompany(user);
      const product = this.productRepositery.create({
        ...rest,
        company,
      });
      await this.productRepositery.save(product);

      if (isArray(fitments) && fitments.length > 0) {
        for (const fitment of fitments) {
          const productFitment = this.productFitmentRepositery.create({
            ...fitment,
            product: product,
          });

          await this.productFitmentRepositery.save(productFitment);
        }
      }
      if (isArray(inventory) && inventory.length > 0) {
        for (const singleInventory of inventory) {
          const productInventory = this.productInventoryRepositery.create({
            ...singleInventory,
            product: product,
          });

          await this.productInventoryRepositery.save(productInventory);
        }
      }
      if (isArray(mediaFiles) && mediaFiles.length > 0) {
        for (const mediaFile of mediaFiles) {
          const productMedia = this.productMediaRepositery.create({
            ...mediaFile,
            product: product,
          });

          await this.productMediaRepositery.save(productMedia);
        }
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
