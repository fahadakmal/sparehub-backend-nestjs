import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { SortingOrder } from 'src/common/constants/enums/sortingOrder.enum';
import { CompanyService } from 'src/company/company.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create_product.dto';
import { GetProductsFilterDto } from './dtos/get-products-filter.dto';
import { Product } from './entities/product.entity';
import { ProductListing } from './interfaces/product-listing.interrface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepositery: Repository<Product>,
    private companyService: CompanyService,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<void> {
    try {
      const company = await this.companyService.getCompany(user);
      const product = this.productRepositery.create({
        ...createProductDto,
        company,
      });
      await this.productRepositery.save(product);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getProducts(
    getProductsFiterDto: GetProductsFilterDto,
    user: User,
  ): Promise<ProductListing> {
    try {
      const company = await this.companyService.getCompany(user);
      if (!company) {
        throw new NotFoundException(
          'There is no company linked to your account',
        );
      }
      const { search, status, order, page, orderCol, limit } =
        getProductsFiterDto;
      const pageNumber = page ? parseInt(page) : 1;
      const recordsLimit = limit ? parseInt(limit) : 10;
      const skip = (pageNumber - 1) * recordsLimit;
      const orderByCol = orderCol ? `product.${orderCol}` : 'product.id';
      const sort: SortingOrder = order ? order : SortingOrder.ASC;

      const query = this.productRepositery
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.fitments', 'product_fitments');

      query.where('(product.coId = :coId)', { coId: company.id });

      if (search) {
        query.where(
          '(product.productName iLike :search OR product.itemCode iLike :search OR product.barcode iLike :search)',
          {
            search: `%${search}%`,
          },
        );
      }
      if (!!status) {
        query.andWhere('product.status = :status', {
          status: `${status}`,
        });
      }
      query.orderBy(orderByCol, sort);
      if (!!page) {
        query.skip(skip);
        query.take(recordsLimit);
      }
      const [products, count] = await query.getManyAndCount();

      if (!products) {
        throw new NotFoundException('Products not found');
      }

      const productListing = {
        products: products,
        totalCount: count,
      };
      return productListing;
    } catch (error) {
      throw new InternalServerErrorException(error.meesage);
    }
  }

  async getProduct(productId: string): Promise<Product> {
    try {
      const query = this.productRepositery.createQueryBuilder('product');
      query.where('(product.id  = (:productId))', {
        productId: parseInt(productId),
      });
      query.leftJoinAndSelect('product.fitments', 'product_fitment');
      query.leftJoinAndSelect('product_fitment.make', 'car_make');
      query.leftJoinAndSelect('product_fitment.model', 'car_model');

      query.leftJoinAndSelect(
        'product.productToInventory',
        'productToInventory',
      );
      query.leftJoinAndSelect('productToInventory.store', 'company_store');
      query.leftJoinAndSelect('product.images', 'product_image');
      query.leftJoinAndSelect('product.brand', 'brand');
      query.leftJoinAndSelect('product.categories', 'prod_category');

      const product = await query.getOne();
      if (!product) {
        throw new NotFoundException();
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
