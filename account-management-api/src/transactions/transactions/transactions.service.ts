import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountsService } from '../../accounts/accounts/accounts.service';
import { TransactionType } from '../transaction.dto/graphql-types.module';
import {
  Transaction,
  TransactionTypeEnum,
} from '../transaction.entity/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private accountsService: AccountsService,
  ) {}

  async createTransaction(
    accountId: string,
    amount: number,
    type: TransactionTypeEnum,
  ): Promise<TransactionType> {
    const account = await this.accountsService.getAccountById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }

    if (type === 'send' && account.balance < amount) {
      throw new Error('Insufficient balance');
    }

    const newTransaction = this.transactionRepository.create({
      accountId,
      amount,
      type,
      createdAt: new Date(),
    });

    await this.accountsService.updateBalance(
      accountId,
      type === 'send' ? -amount : amount,
    );
    return this.transactionRepository.save(newTransaction);
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }
}
