import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { City } from './city.entity';
import { Country } from './country.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  stateName: string;

  @Column({ length: 2, nullable: true })
  stateCode: string;

  @Column({ length: 50, nullable: true })
  stateNameAr: string;

  @ManyToOne((_type) => Country, (country) => country.states)
  country: Country;

  @OneToMany((_type) => City, (city) => city.state)
  cities: City[];

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;
}
