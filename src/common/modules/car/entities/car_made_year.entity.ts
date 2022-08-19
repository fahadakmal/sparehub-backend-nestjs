import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
