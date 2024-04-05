import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { AccountType } from '../../accounts/account.dto/graphql-types.module';
import { TransactionTypeEnum } from '../transaction.entity/transaction.entity';

registerEnumType(TransactionTypeEnum, {
  name: 'TransactionTypeEnum',
});

@ObjectType('TransactionType')
export class TransactionType {
  @Field(() => ID)
  id: string;

  // Assuming you also have a GraphQL object type for Account
  @Field(() => String)
  accountId: string;

  @Field(() => Float)
  amount: number;

  @Field()
  type: TransactionTypeEnum;

  @Field()
  createdAt: Date;

  @Field(() => AccountType)
  account: AccountType;
}
