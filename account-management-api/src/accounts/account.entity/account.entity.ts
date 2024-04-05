import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from '../../transactions/transaction.entity/transaction.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  userEmail?: string;

  @Column('float', { default: 0 })
  balance: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
