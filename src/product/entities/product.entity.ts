import { bool } from 'aws-sdk/clients/signer';
import { Brand } from 'src/common/modules/brand/entities/brand.entity';
import { ProductType } from 'src/common/modules/product_type/entities/prodouct_type.entity';
import { Company } from 'src/company/entities/company.entity';
import { ProductCategory } from 'src/common/modules/product_category/entities/product_category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { ProductFitment } from './product_fitment.entity';
import { ProductMedia } from './product_image.entity';
import { ProductInventory } from './product_inventory.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  productName: string;

  @Column({ length: 50 })
  productNameAr: string;

  @Column({ default: null })
  itemCode: string;

  @Column({ default: null })
  description: string;

  @Column({ default: null })
  _vendorId: number;

  @Column({ length: 50, default: null })
  uid: string;
  @Column({ length: 50, default: null })
  uSeqId: string;

  @Column({ default: null })
  _vendorPrice: number;
  @Column({ default: null })
  _vendorDiscount: number;
  @Column({ default: null })
  _purchasePrice: number;
  @Column({ default: null })
  _purchaseCx: number;
  @Column({ default: null })
  _costCustoms: number;
  @Column({ default: null })
  _costPrice: number;
  @Column({ default: null })
  _margin: number;
  @Column({ default: null })
  salePrice: number;
  @Column({ default: null })
  discount: number;
  @Column({ default: null })
  salePriceNet: number;
  @Column({ length: 100, default: null })
  attText1: string;
  @Column({ length: 200, default: null })
  attText2: string;
  @Column({ default: null })
  attText3: string;
  @Column({ length: 100, default: null })
  attText4: string;
  @Column({ length: 100, default: null })
  attText5: string;
  @Column({ length: 300, default: null })
  attText6: string;
  @Column({ length: 100, default: null })
  attText7: string;
  @Column({ default: null })
  attText8: string;
  @Column({ default: null })
  attText9: string;
  @Column({ default: null })
  attText10: string;
  @Column({ default: null })
  attNumber1: number;
  @Column({ default: null })
  attNumber2: number;
  @Column({ type: 'timestamptz', default: null })
  attDate1: Date;
  @Column({ type: 'timestamptz', default: null })
  attDate2: Date;
  @Column({ default: null })
  attd1: number;
  @Column({ default: null })
  attd2: number;
  @Column({ default: null })
  attd3: number;
  @Column({ default: null })
  attd4: number;
  @Column({ length: 50, default: null })
  country: string;
  @Column({ length: 100, default: null })
  style: string;
  @Column({ default: null })
  tags: string;

  @Column({ default: false })
  isInStock: bool;
  @Column({ length: 10, default: 'unPublished' })
  status: string;

  @Column({ default: null })
  summaryAr: string;
  @Column({ default: null })
  totalStock: number;
  @Column({ length: 10, default: null })
  uom: string;
  @Column({ length: 100, default: null })
  sku: string;
  @Column({ length: 100, default: null })
  barcode: string;
  @Column({ default: false })
  sellEvenOutStock: bool;
  @Column({ default: null })
  totalReviews: number;
  @Column({ default: null })
  avgRating: number;

  @Column({ nullable: false })
  saveAsDraft: boolean;

  @OneToMany(() => ProductMedia, (productMedia) => productMedia.product, {
    eager: true,
  })
  mediaFiles: ProductMedia[];

  @ManyToOne(() => Brand, (brand) => brand.products, {
    eager: false,
  })
  brand: Brand;

  @ManyToOne(() => ProductType, (productType) => productType.products, {
    eager: false,
  })
  type: ProductType;

  @ManyToOne(() => Company, (company) => company.products, {
    eager: false,
  })
  company: Company;

  @OneToMany(
    () => ProductInventory,
    (productInventory) => productInventory.product,
    {
      eager: false,
    },
  )
  productToInventory: ProductInventory[];

  @ManyToMany(
    () => ProductCategory,
    (productCategory) => productCategory.products,
    {
      eager: false,
    },
  )
  categories: ProductCategory[];

  @OneToMany(() => ProductFitment, (productFitment) => productFitment.product, {
    eager: false,
  })
  fitments: ProductFitment[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
