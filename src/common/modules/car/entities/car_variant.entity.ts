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
    eager: true,
  })
  variantYears: CarMadeYear[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
