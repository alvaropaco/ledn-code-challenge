import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello! You are reviewing the account-management-api. A challenge to test my skills as Software Engineer. I hope you enjoy it! :)';
  }
}
