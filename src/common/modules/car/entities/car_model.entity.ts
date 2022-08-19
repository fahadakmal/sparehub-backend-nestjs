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
import { CarType } from './car_type.entities';
import { CarVariant } from './car_variant.entity';

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

  @ManyToOne(() => CarType, (carType) => carType.carModels, { eager: false })
  carType: CarType;

  @OneToMany(() => CarVariant, (corModelYear) => corModelYear.model, {
    eager: true,
  })
  carVariants: CarVariant[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
