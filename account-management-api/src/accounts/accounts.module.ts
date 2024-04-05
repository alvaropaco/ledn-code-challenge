import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity/account.entity';
import { AccountsResolver } from './accounts/accounts.resolver';
import { AccountsService } from './accounts/accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountsService, AccountsResolver],
  exports: [AccountsService],
})
export class AccountsModule {}
