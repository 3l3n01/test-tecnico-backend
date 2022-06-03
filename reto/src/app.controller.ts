import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import * as Moment from 'moment';

// Services
import { AppService } from './app.service';

// Utils
import { ProcessData } from './utils/ProcessData';

// Interfaces
import { ResponseService } from './types/service/response-service.dto';
import { Donations } from './types/service/donations.dto';
import { ResponseDto } from './types/response.dto';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('donations')
@Controller('/api')
export class AppController {
  private processData: ProcessData = new ProcessData();

  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiCreatedResponse({
    description: 'Retrieve donation records.',
    status: 200,
  })
  @Get('/donations')
  async getListDonations(
    @Query('country') country: string,
    @Query('startDate') startDate: Date,
  ): Promise<ResponseDto> {
    if (country === undefined) {
      throw new HttpException('Country is required', HttpStatus.BAD_REQUEST);
    }
    let donations: Donations[] = [];
    const keyCache: string = `${country}${Moment(new Date(startDate)).format(
      'YYYY',
    )}`;
    var cacheData = await this.cacheManager.get<ResponseDto>(
      Buffer.from(keyCache).toString('base64'),
    );
    if (cacheData) {
      return cacheData;
    } else {
      try {
        // First Request
        let data: ResponseService = await lastValueFrom(
          this.appService.getDonations(country, startDate),
        );
        // Add Data
        donations = donations.concat(data.data);
        // Validate that there are more records than those shown on the page
        if (data.meta.total > 50) {
          const pageTotal: number = Math.ceil(data.meta.total / 50); // round to the top
          // requests data
          for (let i = 2; i < pageTotal; i++) {
            data = await lastValueFrom(
              this.appService.getDonations(country, startDate, i),
            );
            donations = donations.concat(data.data);
          }
        }
        // Process & return Data
        const resp: ResponseDto = this.processData.process(donations);
        this.cacheManager.set<ResponseDto>(keyCache, resp, { ttl: 5000 }); // Cache data
        return resp;
      } catch (error) {
        console.error(error);
        throw new HttpException(
          'Your request could not be processed.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
