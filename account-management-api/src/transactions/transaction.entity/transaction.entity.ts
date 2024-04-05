import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../../accounts/account.entity/account.entity';

export enum TransactionTypeEnum {
  send = 'send',
  receive = 'receive',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  @Column()
  accountId: string;

  @Column('float')
  amount: number;

  @Column()
  type: TransactionTypeEnum;

  @Column()
  createdAt: Date;
}
