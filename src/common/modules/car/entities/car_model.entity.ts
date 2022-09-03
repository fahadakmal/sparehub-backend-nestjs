import { ProductFitment } from 'src/product/entities/product_fitment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CarMake } from './car_make.entity';

@Entity('car_model')
export class CarModel {
  @ManyToOne(() => CarMake)
  @JoinColumn({ name: 'make', referencedColumnName: 'make' })
  make: CarMake;

  @PrimaryColumn({ length: 50 })
  model: string;

  @Column({ length: 10 })
  modelYear: string;

  @Column('jsonb', { nullable: true })
  variant?: object[];

  @Column({ length: 50 })
  region: string;

  @Column('simple-array', { nullable: true })
  carTypes: string[];

  @Column({ length: 50, default: null })
  modelAr: string;

  @Column({ default: null })
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ProductFitment, (productFitment) => productFitment.model)
  products: ProductFitment[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
