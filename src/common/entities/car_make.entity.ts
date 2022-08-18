import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CarModel } from './car_model.entity';

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

  @OneToMany(() => CarModel, (corModel) => corModel.make, { eager: true })
  car_models: CarModel[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
