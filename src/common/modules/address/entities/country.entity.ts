import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { State } from './state.entity';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  countryName: string;

  @Column({ length: 2, nullable: true })
  countryCode: string;

  @Column({ length: 50, nullable: true })
  countryNameAr: string;

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;

  @OneToMany((_type) => State, (state) => state.country)
  states: State[];
}
