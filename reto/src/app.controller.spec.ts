import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/common';
import ResponseData from './test_data/responseController';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, CacheModule.register()],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  describe('getListDonations', () => {
    it('return process donations', async () => {
      expect(
        await appController.getListDonations('SD', new Date('01-05-2017')),
      ).toStrictEqual(ResponseData);
    });
  });
});
