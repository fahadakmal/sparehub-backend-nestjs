import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Bank } from './bank.entity';
import { Company } from './company.entity';

@Entity()
export class CompanyBank {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_type) => Company, (company) => company.banks)
  company: Company;

  @Column({ length: 100 })
  accountTitle: string;

  @Column({ length: 100 })
  accountNo: string;

  @Column({ length: 100 })
  iban: string;

  @OneToOne(() => Bank)
  @JoinColumn()
  bankId: Bank;

  @Column({ length: 20 })
  branchCode: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
