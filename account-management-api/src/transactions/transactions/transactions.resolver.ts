import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AccountType } from '../../accounts/account.dto/graphql-types.module';
import { AccountsService } from '../../accounts/accounts/accounts.service';
import { TransactionType } from '../transaction.dto/graphql-types.module';
import { TransactionTypeEnum } from '../transaction.entity/transaction.entity';
import { TransactionsService } from './transactions.service';

@Resolver(() => TransactionType)
export class TransactionsResolver {
  constructor(
    private transactionsService: TransactionsService,
    private accountsService: AccountsService,
  ) {}

  @ResolveField('account', () => AccountType)
  async account(@Parent() transaction: TransactionType) {
    const { accountId } = transaction;
    return this.accountsService.getAccountById(accountId);
  }

  @Mutation(() => TransactionType)
  createTransaction(
    @Args('accountId') accountId: string,
    @Args('amount') amount: number,
    @Args('type') type: TransactionTypeEnum,
  ): Promise<TransactionType> {
    return this.transactionsService.createTransaction(accountId, amount, type);
  }

  @Query(() => [TransactionType], { name: 'getAllTransactions' })
  async getAllTransactions(): Promise<TransactionType[]> {
    return this.transactionsService.getAllTransactions();
  }
}
