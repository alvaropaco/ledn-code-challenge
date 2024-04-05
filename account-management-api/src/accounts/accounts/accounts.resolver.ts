import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountType } from '../account.dto/graphql-types.module';
import { Account } from '../account.entity/account.entity';
import { AccountsService } from './accounts.service';

@Resolver(() => AccountType)
export class AccountsResolver {
  constructor(private accountsService: AccountsService) {}

  @Query(() => AccountType)
  getAccount(@Args('id') id: string): Promise<Account> {
    return this.accountsService.getAccountById(id);
  }

  @Mutation(() => AccountType)
  createAccount(
    @Args('userEmail') userEmail: string,
    @Args('balance') balance: number,
  ): Promise<AccountType> {
    return this.accountsService.createAccount(userEmail, balance);
  }
}
