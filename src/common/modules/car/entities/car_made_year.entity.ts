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
import { CarVariant } from './car_variant.entity';

@Entity()
export class CarMadeYear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  madeYear: string;

  @ManyToOne(() => CarVariant, (carVariant) => carVariant.variantYears, {
    eager: false,
  })
  variant: CarVariant;

  @OneToMany(
    (_type) => ProductFitment,
    (productFitment) => productFitment.carMadeYear,
    { eager: false },
  )
  products: ProductFitment[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
