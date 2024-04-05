import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Transactions (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  async function createAccount(
    balance: number,
    userEmail: string,
  ): Promise<string> {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation { createAccount(userEmail: "${userEmail}", balance: ${balance}) { id } }`,
      })
      .expect(200);
    return response.body.data.createAccount.id;
  }

  it('should create an account and get its current balance', async () => {
    const accountId = await createAccount(100, 'test@example.com');
    const { body } = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: `{ getAccount(id: "${accountId}") { id balance } }` })
      .expect(200);
    expect(body.data.getAccount).toHaveProperty('id', accountId);
    expect(body.data.getAccount).toHaveProperty('balance', 100);
  });

  it('should create a send transaction for an account', async () => {
    const accountId = await createAccount(100, 'send@example.com');
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation { createTransaction(accountId: "${accountId}", amount: 50, type: "send") { id amount type } }`,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.createTransaction).toHaveProperty('id');
        expect(body.data.createTransaction.amount).toEqual(50);
        expect(body.data.createTransaction.type).toEqual('send');
      });
  });

  it('should create a receive transaction for an account', async () => {
    const accountId = await createAccount(50, 'receive@example.com');
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation { createTransaction(accountId: "${accountId}", amount: 50, type: "receive") { id amount type } }`,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.createTransaction).toHaveProperty('id');
        expect(body.data.createTransaction.amount).toEqual(50);
        expect(body.data.createTransaction.type).toEqual('receive');
      });
  });

  it('should reflect the sum of send and receive transactions in account balance', async () => {
    const accountId = await createAccount(100, 'balance@example.com');

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation { createTransaction(accountId: "${accountId}", amount: 50, type: "send") { id } }`,
      })
      .expect(200);

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation { createTransaction(accountId: "${accountId}", amount: 50, type: "receive") { id } }`,
      })
      .expect(200);

    const { body } = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: `{ getAccount(id: "${accountId}") { balance } }` })
      .expect(200);

    expect(body.data.getAccount.balance).toEqual(100);
  });

  it('should handle concurrent requests properly', async () => {
    const accountId = await createAccount(100, 'concurrent@example.com');
    const server = app.getHttpServer();

    const sendTransactions = Array.from({ length: 3 }, () =>
      request(server)
        .post('/graphql')
        .send({
          query: `mutation { createTransaction(accountId: "${accountId}", amount: 10, type: "send") { id } }`,
        }),
    );

    const sendResults = await Promise.allSettled(sendTransactions);

    sendResults.forEach((result) => expect(result.status).toBe('fulfilled'));

    // Pause briefly to ensure all transactions are processed if needed
    // Especially useful if the db operations are asynchronous or involve delayed processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const receiveTransactions = Array.from({ length: 3 }, () =>
      request(server)
        .post('/graphql')
        .send({
          query: `mutation { createTransaction(accountId: "${accountId}", amount: 10, type: "receive") { id } }`,
        }),
    );

    const receiveResults = await Promise.allSettled(receiveTransactions);
    receiveResults.forEach((result) => expect(result.status).toBe('fulfilled'));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { body } = await request(server)
      .post('/graphql')
      .send({ query: `{ getAccount(id: "${accountId}") { balance } }` })
      .expect(200);

    expect(body.data.getAccount.balance).toEqual(100);
  });
});
