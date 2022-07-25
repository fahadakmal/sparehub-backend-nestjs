import { Exclude } from 'class-transformer';
import { CompanyBank } from 'src/company/entities/company_bank.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Country } from '../../address/entities/country.entity';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @ManyToOne((_type) => Country, (country) => country.banks, {
    eager: true,
  })
  country: Country;

  @Exclude()
  @Column({ default: true })
  isActive: boolean;

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;

  @OneToMany((_type) => CompanyBank, (companyBank) => companyBank.bank, {
    eager: false,
  })
  companyBanks: CompanyBank[];
}
