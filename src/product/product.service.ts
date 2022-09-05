import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CompanyService } from 'src/company/company.service';
import { Brackets, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create_product.dto';
import { Product } from './entities/product.entity';

type query = {
  search: string;
  status: string;
  order: string;
  page: number;
  orderCol: string;
};

type productListing = {
  products: Product[];
  totalCount: number;
};

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

  async getProductsListing(payload: query): Promise<productListing> {
    try {
      const { search, status, order, page, orderCol } = payload;
      const pageNumber = page ? page : 1;
      const skip = (pageNumber - 1) * 10;
      const orderByCol = orderCol ? `product.${orderCol}` : 'product.id';
      const sort: any = order ? order : 'ASC';

      const query = this.productRepositery
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.fitments', 'product_fitments');

      if (!!search) {
        query.where(
          new Brackets((qb) => {
            qb.where('product.productName iLike :productName', {
              productName: `%${search}%`,
            })
              .orWhere('product.itemCode iLike :itemCode', {
                itemCode: `%${search}%`,
              })
              .orWhere('product.barcode iLike :barcode', {
                barcode: `%${search}%`,
              });
          }),
        );
      }
      if (!!status) {
        query.andWhere('product.status =:status', {
          status: `${status}`,
        });
      }
      query.orderBy(orderByCol, sort);
      if (!!page) {
        query.skip(skip);
        query.take(10);
      }
      const [products, count] = await query.getManyAndCount();

      if (!products) {
        throw new NotFoundException();
      }
      const productListing = {
        products: products,
        totalCount: count,
      };
      return productListing;
    } catch (error) {
      throw new InternalServerErrorException();
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
