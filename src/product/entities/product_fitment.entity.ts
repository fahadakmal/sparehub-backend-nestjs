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
  RelationId,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductFitment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.fitments, {
    eager: false,
  })
  product: Product;

  @ManyToOne(() => CarMake, (carMake) => carMake.products, {
    eager: false,
  })
  carMake: CarMake;
  @RelationId((productFitment: ProductFitment) => productFitment.carMake)
  carMakeId: number;
  @ManyToOne(() => CarType, (carType) => carType.products, {
    eager: false,
  })
  carType: Product;
  @RelationId((productFitment: ProductFitment) => productFitment.carType)
  carTypeId: number;
  @ManyToOne(() => CarModel, (carModel) => carModel.products, {
    eager: false,
  })
  carModel: CarModel;

  @RelationId((productFitment: ProductFitment) => productFitment.carModel)
  carModelId: number;

  @ManyToOne(() => CarVariant, (carVariant) => carVariant.products, {
    eager: false,
  })
  carVariant: CarVariant;

  @RelationId((productFitment: ProductFitment) => productFitment.carVariant)
  carVariantId: number;
  @ManyToOne(() => CarMadeYear, (carMadeYear) => carMadeYear.products, {
    eager: false,
  })
  carMadeYear: CarMadeYear;

  @RelationId((productFitment: ProductFitment) => productFitment.carMadeYear)
  carMadeYearId: number;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
