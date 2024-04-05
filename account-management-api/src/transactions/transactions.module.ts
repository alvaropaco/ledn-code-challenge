import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../accounts/account.entity/account.entity';
import { AccountsService } from '../accounts/accounts/accounts.service';
import { Transaction } from './transaction.entity/transaction.entity';
import { TransactionsResolver } from './transactions/transactions.resolver';
import { TransactionsService } from './transactions/transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Transaction])],
  providers: [AccountsService, TransactionsService, TransactionsResolver],
  exports: [TransactionsService],
})
export class TransactionsModule {}
