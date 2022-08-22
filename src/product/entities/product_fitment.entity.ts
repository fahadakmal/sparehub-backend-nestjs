import { CarMadeYear } from 'src/common/modules/car/entities/car_made_year.entity';
import { CarMake } from 'src/common/modules/car/entities/car_make.entity';
import { CarModel } from 'src/common/modules/car/entities/car_model.entity';
import { CarType } from 'src/common/modules/car/entities/car_type.entities';
import { CarVariant } from 'src/common/modules/car/entities/car_variant.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductFitment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  saveAsDraft: boolean;

  @ManyToOne(() => Product, (product) => product.fitments, {
    eager: false,
  })
  product: Product;

  @ManyToOne(() => CarMake, (carMake) => carMake.products, {
    eager: false,
  })
  carMake: CarMake;
  @ManyToOne(() => CarType, (carType) => carType.products, {
    eager: false,
  })
  carType: Product;
  @ManyToOne(() => CarModel, (carModel) => carModel.products, {
    eager: false,
  })
  carModel: CarModel;

  @ManyToOne(() => CarVariant, (carVariant) => carVariant.products, {
    eager: false,
  })
  carVariant: CarVariant;
  @ManyToOne(() => CarMadeYear, (carMadeYear) => carMadeYear.products, {
    eager: false,
  })
  carMadeYear: CarMadeYear;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
