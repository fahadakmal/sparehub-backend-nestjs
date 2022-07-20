import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { State } from './state.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  cityName: string;

  @Column({ length: 50, nullable: true })
  cityNameAr: string;

  @ManyToOne((_type) => State, (state) => state.cities)
  state: State;

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;
}
