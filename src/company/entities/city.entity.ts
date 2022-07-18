import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Country } from './country.entity';
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

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
