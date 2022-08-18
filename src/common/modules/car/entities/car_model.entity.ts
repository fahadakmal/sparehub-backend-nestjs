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
import { CarModelYear } from './car_model_year.entity';

@Entity()
export class CarModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  modelName: string;

  @Column({ length: 50 })
  modelNameAr: string;

  @Column()
  sortOrder: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 50 })
  region: string;

  @ManyToOne(() => CarMake, (carMake) => carMake.car_models, { eager: false })
  make: CarMake;

  @OneToMany(() => CarModelYear, (corModelYear) => corModelYear.model, {
    eager: true,
  })
  car_variants: CarModelYear[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
