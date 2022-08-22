import { ProductFitment } from 'src/product/entities/product_fitment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CarModel } from './car_model.entity';
import { CarType } from './car_type.entities';

@Entity()
export class CarMake {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  makeName: string;

  @Column({ length: 50 })
  makeNameAr: string;

  @Column({ length: 50, default: null })
  region: string;

  @Column({ default: null })
  logo: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => CarType, (carType) => carType.make, { eager: true })
  car_types: CarType[];
  @OneToMany(
    (_type) => ProductFitment,
    (productFitment) => productFitment.carMake,
    { eager: false },
  )
  products: ProductFitment[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
