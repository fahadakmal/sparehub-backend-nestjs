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
import { ProductListingDto } from './dtos/product-listing.dto';

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
  ): Promise<ProductListingDto> {
    try {
      const company = await this.companyService.getCompany(user);
      if (!company) {
        throw new NotFoundException(
          'There is no company linked to your account',
        );
      }
      const { search, status, order, orderBy } = getProductsFiterDto;
      let page = parseInt(getProductsFiterDto.page);
      let limit = parseInt(getProductsFiterDto.limit);

      page = !!page && page > 0 ? page - 1 : 1;
      limit = !!limit && limit > 0 ? limit : 15;
      const orderByCol = orderBy ? `product.${orderBy}` : 'product.id';

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
      query.orderBy(orderByCol, order || SortingOrder.ASC);
      if (!!page) {
        query.skip(limit * page);
        query.take(limit);
      }
      const [products, count] = await query.getManyAndCount();

      if (!products) {
        throw new NotFoundException('Products not found');
      }

      const productListing = {
        products: products,
        totalCount: count,
        nextPage: count > (page + 1) * limit ? page + 2 : null,
        pages: Math.ceil(count / limit),
        perPageCount: products.length,
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
