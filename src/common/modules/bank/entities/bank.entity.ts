import { CompanyBank } from 'src/company/entities/company_bank.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Country } from '../../address/entities/country.entity';

@Entity('bank')
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 100, nullable: true })
  nameAr: string;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn({ name: 'country', referencedColumnName: 'countryCode' })
  country: Country;

  @Column({ default: true, nullable: false })
  isActive: boolean;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @OneToMany((_type) => CompanyBank, (companyBank) => companyBank.bank, {
    eager: false,
  })
  companyBanks: CompanyBank[];
}
