import { bool } from 'aws-sdk/clients/signer';
import { Brand } from 'src/common/modules/brand/entities/brand.entity';
import { ProductType } from 'src/common/modules/product_type/entities/prodouct_type.entity';
import { Company } from 'src/company/entities/company.entity';
import { ProdCategory } from 'src/common/modules/product_category/entities/prod_category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { ProductFitment } from './product_fitment.entity';
import { ProductImage } from './product_image.entity';
import { ProductInventory } from './product_inventory.entity';
import { Country } from 'src/common/modules/address/entities/country.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'coId', referencedColumnName: 'id' })
  company: Company;

  @Column({ length: 250 })
  productName: string;

  @Column({ default: null })
  itemCode: string;

  @Column({ default: null })
  description: string;

  @Column({ default: null })
  descriptionAr: string;

  @ManyToOne(() => ProductType, (productType) => productType.products)
  type: ProductType;

  @Column({ default: null })
  categoryId: number;

  @Column({ default: null })
  subCategoryId: number;

  @Column({ default: null })
  _vendorId: number;

  @Column({ length: 50, default: null })
  uid: string;
  @Column({ length: 50, default: null })
  uSeqId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: null })
  _vendorPrice: number;
  @Column({ type: 'decimal', precision: 5, scale: 2, default: null })
  _vendorDiscount: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: null })
  _purchasePrice: number;
  @Column({ type: 'decimal', precision: 3, default: null })
  _purchaseCx: number;
  @Column({ type: 'decimal', precision: 5, scale: 2, default: null })
  _costCustoms: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: null })
  _costPrice: number;
  @Column({ type: 'decimal', precision: 5, scale: 2, default: null })
  _margin: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: null })
  salePrice: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: null })
  discount: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: null })
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

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country', referencedColumnName: 'countryCode' })
  country: Country;

  @Column({ length: 100, default: null })
  style: string;
  @Column({ default: null })
  tags: string;

  @OneToMany(() => ProductImage, (productMedia) => productMedia.product, {
    eager: false,
    cascade: ['insert', 'update', 'soft-remove', 'remove', 'recover'],
  })
  images: ProductImage[];

  @Column({ default: false })
  isInStock: bool;
  @Column({ length: 50, nullable: false })
  status: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @Column({ length: 250 })
  productNameAr: string;

  @Column({ default: null })
  summaryAr: string;
  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0 })
  totalStock: number;
  @Column({ length: 10, default: null })
  uom: string;
  @Column({ length: 100, default: null })
  sku: string;
  @Column({ length: 100, default: null })
  barcode: string;
  @Column({ default: false })
  sellEvenOutStock: bool;

  @Column({ default: 0 })
  totalReviews: number;
  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0 })
  avgRating: number;

  @OneToMany(
    () => ProductInventory,
    (productInventory) => productInventory.product,
    {
      cascade: ['insert', 'update', 'soft-remove', 'remove', 'recover'],
    },
  )
  productToInventory: ProductInventory[];

  @ManyToMany(() => ProdCategory, {
    cascade: ['insert', 'update', 'soft-remove', 'remove', 'recover'],
  })
  @JoinTable({
    name: 'product_category',
    joinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
  })
  categories: ProdCategory[];

  @OneToMany(() => ProductFitment, (productFitment) => productFitment.product, {
    cascade: ['insert', 'update', 'soft-remove', 'remove', 'recover'],
  })
  fitments: ProductFitment[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
