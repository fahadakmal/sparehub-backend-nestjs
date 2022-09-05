import { ProductFitment } from 'src/product/entities/product_fitment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CarModel } from './car_model.entity';

@Entity('car_make')
export class CarMake {
  @PrimaryColumn({ length: 50 })
  make: string;

  @Column({ length: 50, nullable: true })
  makeAr: string;

  @Column({ length: 50, nullable: true })
  region: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ default: true, nullable: true })
  isActive: boolean;

  @OneToMany(() => CarModel, (model) => model.make)
  @JoinColumn()
  models: CarModel;

  @OneToMany(() => ProductFitment, (productFitment) => productFitment.make)
  @JoinColumn()
  products: ProductFitment;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
