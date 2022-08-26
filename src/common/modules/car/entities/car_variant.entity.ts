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
import { CarMadeYear } from './car_made_year.entity';
import { CarModel } from './car_model.entity';

@Entity()
export class CarVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  variantName: string;

  @Column({ length: 50 })
  variantNameAr: string;

  @Column({ length: 50, default: null })
  region: string;

  @ManyToOne((_type) => CarModel, (carModel) => carModel.carVariants, {
    eager: false,
  })
  model: CarModel;

  @OneToMany(() => CarMadeYear, (carMadeYear) => carMadeYear.variant, {
    eager: false,
  })
  variantYears: CarMadeYear[];

  @OneToMany(
    (_type) => ProductFitment,
    (productFitment) => productFitment.carVariant,
    { eager: false },
  )
  products: ProductFitment[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
