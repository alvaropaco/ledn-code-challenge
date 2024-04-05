# Alvaro Paco - Ledn token API Code Challenge

This project is a NestJS-based accounting management API that allows for managing accounts and transactions with robust rules ensuring data integrity and consistency. It supports creating and querying accounts, processing financial transactions, and maintaining accurate account balances, even under concurrent usage scenarios.

## Features

- **Account Management**: Supports querying account details, including current balances.
- **Transaction Processing**: Allows for creating `send` and `receive` transactions affecting account balances.
  - Ensures no account can have a negative balance.
  - Keeps the account `balance` field accurately reflecting all transactions.
- **Concurrency Support**: Designed to handle concurrent access by multiple team members or systems, ensuring reliable operation under load.

## Technologies

- **NestJS**: For building efficient and scalable server-side applications.
- **TypeORM**: As an ORM to interact with the SQLite database.
- **SQLite**: Chosen for its simplicity and ease of use for demonstration purposes.

## Getting Started

### Prerequisites

- Node.js (version 12+)
- npm (version 6+)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/nestjs-banking-api.git
cd nestjs-banking-api
npm install
```

### Running the Application

Start the application in development mode:

```bash
npm run start:dev
```

For production mode, use:

```bash
npm run start:prod
```

## Using the API

This API is GraphQL-based, providing a flexible query language for your client apps to interact with. Below are examples of how you might interact with the API to perform common operations. These can be executed via any GraphQL client or a tool like [GraphQL Playground](https://github.com/graphql/graphql-playground).

### Create an Account

To create a new account with an initial balance and user email:

```graphql
mutation {
  createAccount(balance: 100, userEmail: "user@example.com") {
    id
    balance
    userEmail
    createdAt
    updatedAt
  }
}
```

### Create a Transaction

To create a transaction (either `send` or `receive`):

**Send Transaction:**

```graphql
mutation {
  createTransaction(accountId: "your-account-id", amount: 50, type: "send") {
    id
    account {
      id
      balance
    }
    amount
    type
    createdAt
  }
}
```

**Receive Transaction:**

```graphql
mutation {
  createTransaction(accountId: "your-account-id", amount: 50, type: "receive") {
    id
    account {
      id
      balance
    }
    amount
    type
    createdAt
  }
}
```

### Get Account and Balance

To retrieve an account and its current balance along with transactions:

```graphql
query {
  getAccount(id: "your-account-id") {
    id
    balance
    userEmail
    transactions {
      id
      amount
      type
      createdAt
    }
  }
}
```

### Get All Transactions

To list all transactions:

```graphql
query {
  getAllTransactions {
    id
    account {
      id
      userEmail
    }
    amount
    type
    createdAt
  }
}
```

## Conclusion

This API provides a robust foundation for managing accounts and transactions, ensuring data integrity and consistency even under concurrent access. It can be extended with additional features and integrations to meet specific business requirements.

# Contact Information
Candidate: Alvaro Paco
Email: alvaropaconeto@gmail.com
LinkedIn: [Alvaro Paco](https://www.linkedin.com/in/alvaropaco/)
