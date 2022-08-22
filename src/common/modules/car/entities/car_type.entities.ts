import { ProductFitment } from 'src/product/entities/product_fitment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CarMake } from './car_make.entity';
import { CarModel } from './car_model.entity';
import { CarVariant } from './car_variant.entity';

@Entity()
export class CarType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  carTypeName: string;

  @Column({ length: 50 })
  carTypeNameAr: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => CarMake, (carMake) => carMake.car_types, { eager: false })
  make: CarMake;

  @OneToMany(() => CarModel, (carModel) => carModel.carType, {
    eager: true,
  })
  carModels: CarModel[];

  @OneToMany(
    (_type) => ProductFitment,
    (productFitment) => productFitment.carType,
    { eager: false },
  )
  products: ProductFitment[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
