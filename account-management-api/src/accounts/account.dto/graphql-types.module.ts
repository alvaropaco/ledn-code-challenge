import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { TransactionType } from '../../transactions/transaction.dto/graphql-types.module';

@ObjectType('AccountType')
export class AccountType {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  userEmail?: string;

  @Field(() => Float, { defaultValue: 0 })
  balance: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [TransactionType], { nullable: 'itemsAndList' })
  transactions: TransactionType[];
}
