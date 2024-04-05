import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountType } from '../account.dto/graphql-types.module';
import { Account } from '../account.entity/account.entity';
import { SerialQueue } from './SerialQueue';

@Injectable()
export class AccountsService {
  private updateQueue = new SerialQueue();
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async getAllAccounts(): Promise<AccountType[]> {
    return this.accountRepository.find({ relations: ['transactions'] });
  }

  async getAccountById(id: string): Promise<AccountType> {
    return this.accountRepository.findOneOrFail({ where: { id } });
  }

  async createAccount(
    userEmail: string,
    balance: number = 0,
  ): Promise<Account> {
    const newAccount = this.accountRepository.create({
      userEmail,
      balance,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.accountRepository.save(newAccount);
  }

  updateBalance(accountId: string, amount: number) {
    return this.updateQueue.add(async () => {
      const account = await this.accountRepository.findOneBy({ id: accountId });
      if (!account) throw new Error('Account not found');

      account.balance += amount;
      await this.accountRepository.save(account);
    });
  }
}
