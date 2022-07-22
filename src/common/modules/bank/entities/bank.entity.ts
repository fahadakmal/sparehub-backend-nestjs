import { Exclude } from 'class-transformer';
import { CompanyBank } from 'src/company/entities/company_bank.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 2 })
  country: string;

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
