import { Module, CacheModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as redisStore from 'cache-manager-redis-store';

import Conf from './env';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      store: redisStore,
      host: Conf.redis.host,
      port: Conf.redis.port,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
