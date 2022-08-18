import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CarModel } from './car_model.entity';

@Entity()
export class CarModelYear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelYear: number;

  @Column({ length: 50 })
  varinat: string;

  @Column({ length: 50, default: null })
  region: string;

  @ManyToOne((_type) => CarModel, (carModel) => carModel.car_variants, {
    eager: false,
  })
  model: CarModel;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
