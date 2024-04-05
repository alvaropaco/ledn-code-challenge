import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello message"', () => {
      expect(appController.getHello()).toBe(
        'Hello! You are reviewing the account-management-api. A challenge to test my skills as Software Engineer. I hope you enjoy it! :)',
      );
    });
  });
});
