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

  @Column({ length: 500 })
  text1Att: string;

  @Column({ length: 500 })
  text2Att: string;

  @Column({ length: 500 })
  text3Att: string;

  @Column({ length: 500 })
  text4Att: string;

  @Column({ length: 500 })
  text5Att: string;

  @Column({ length: 500 })
  num1Att: string;

  @Column({ length: 500 })
  num2Att: string;

  @Column({ length: 500 })
  date1Att: string;

  @Column({ length: 500 })
  date2Att: string;

  @Column({ length: 500 })
  id1Att: string;

  @Column({ length: 500 })
  id2Att: string;

  @Column({ length: 500 })
  id3Att: string;

  @Column({ length: 500 })
  id4Att: string;

  @Column({ length: 500 })
  listId1Att: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
