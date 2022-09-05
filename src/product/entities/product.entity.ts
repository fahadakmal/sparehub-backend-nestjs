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

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'coId', referencedColumnName: 'id' })
  company: Company;

  @Column({ length: 250, nullable: true })
  productName: string;

  @Column({ nullable: true })
  itemCode: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  descriptionAr: string;

  @ManyToOne(() => ProductType, (productType) => productType.products, {
    nullable: true,
  })
  type: ProductType;

  @Column({ nullable: true })
  categoryId: number;

  @Column({ nullable: true })
  subCategoryId: number;

  @Column({ nullable: true })
  _vendorId: number;

  @Column({
    length: 50,
    nullable: false,
    default: Math.random().toString(36).slice(2),
  })
  uid: string;
  @Column({ length: 50, nullable: false })
  uSeqId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  _vendorPrice: number;
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  _vendorDiscount: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  _purchasePrice: number;
  @Column({ type: 'decimal', precision: 3, nullable: true })
  _purchaseCx: number;
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  _costCustoms: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  _costPrice: number;
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  _margin: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salePrice: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salePriceNet: number;
  @Column({ length: 100, nullable: true })
  attText1: string;
  @Column({ length: 200, nullable: true })
  attText2: string;
  @Column({ nullable: true })
  attText3: string;
  @Column({ length: 100, nullable: true })
  attText4: string;
  @Column({ length: 100, nullable: true })
  attText5: string;
  @Column({ length: 300, nullable: true })
  attText6: string;
  @Column({ length: 100, nullable: true })
  attText7: string;
  @Column({ nullable: true })
  attText8: string;
  @Column({ nullable: true })
  attText9: string;
  @Column({ nullable: true })
  attText10: string;
  @Column({ nullable: true })
  attNumber1: number;
  @Column({ nullable: true })
  attNumber2: number;
  @Column({ type: 'timestamptz', nullable: true })
  attDate1: Date;
  @Column({ type: 'timestamptz', nullable: true })
  attDate2: Date;
  @Column({ nullable: true })
  attId1: number;
  @Column({ nullable: true })
  attId2: number;
  @Column({ nullable: true })
  attId3: number;
  @Column({ nullable: true })
  attId4: number;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn({ name: 'country', referencedColumnName: 'countryCode' })
  country: Country;

  @Column({ length: 100, nullable: true })
  styles: string;
  @Column({ nullable: true })
  tags: string;

  @OneToMany(() => ProductImage, (productMedia) => productMedia.product, {
    cascade: ['insert', 'update', 'soft-remove', 'remove', 'recover'],
  })
  images: ProductImage[];

  @Column({ default: false, nullable: true })
  isInStock: bool;
  @Column({ length: 50, nullable: true })
  status: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @Column({ length: 250, nullable: true })
  productNameAr: string;

  @Column({ nullable: true })
  summaryAr: string;
  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  totalStock: number;
  @Column({ length: 10, nullable: true })
  uom: string;
  @Column({ length: 100, nullable: true })
  sku: string;
  @Column({ length: 100, nullable: true })
  barcode: string;
  @Column({ default: false, nullable: true })
  sellEvenOutStock: bool;

  @Column({ default: 0, nullable: true })
  totalReviews: number;
  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    default: 0,
    nullable: true,
  })
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
