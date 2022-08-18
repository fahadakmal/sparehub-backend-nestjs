import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProductType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  description: string;

  @Column()
  sortOrder: number;

  @Column({ length: 500, default: null })
  text1Att: string;

  @Column({ length: 500, default: null })
  text2Att: string;

  @Column({ length: 500, default: null })
  text3Att: string;

  @Column({ length: 500, default: null })
  text4Att: string;

  @Column({ length: 500, default: null })
  text5Att: string;

  @Column({ length: 500, default: null })
  num1Att: string;

  @Column({ length: 500, default: null })
  num2Att: string;

  @Column({ length: 500, default: null })
  date1Att: string;

  @Column({ length: 500, default: null })
  date2Att: string;

  @Column({ length: 500, default: null })
  id1Att: string;

  @Column({ length: 500, default: null })
  id2Att: string;

  @Column({ length: 500, default: null })
  id3Att: string;

  @Column({ length: 500, default: null })
  id4Att: string;

  @Column({ length: 500, default: null })
  listId1Att: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}