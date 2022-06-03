import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Observable } from 'rxjs';

// Config
import Conf from './env';

// Model
import { ResponseService } from './types/service/response-service.dto';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getDonations(
    country: string,
    startDate: Date = new Date(),
    page: number = 1,
  ): Observable<ResponseService> {
    let params = {
      page,
      pageSize: 50,
      dateStart: moment(new Date(startDate)).format(Conf.general.dateFormat),
      dateEnd: moment(new Date(startDate))
        .subtract(5, 'years')
        .format(Conf.general.dateFormat),
    }; // Page num

    // Validate include country
    if (country) {
      Object.assign(params, { countries: country });
    }

    return this.httpService
      .get(`${Conf.api.host}/api/donations`, { params })
      .pipe(map((response) => response.data));
  }
}
