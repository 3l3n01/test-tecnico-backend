import { ResponseService } from '../types/service/response-service.dto';

const data: ResponseService = {
  data: [
    {
      id: '249',
      value: '37052',
      date: '2017-12-18T11:39:56.000Z',
      currency: {
        name: 'Dolar',
        abbreviation: 'USD',
      },
      organization: {
        name: 'Sida',
        abbreviation: 'SD',
      },
      country: {
        name: 'Sudán',
        abbreviation: 'SD',
      },
    },
    {
      id: '411',
      value: '10841',
      date: '2017-12-17T03:08:58.000Z',
      currency: {
        name: 'Dolar',
        abbreviation: 'USD',
      },
      organization: {
        name: 'Sida',
        abbreviation: 'SD',
      },
      country: {
        name: 'Sudán',
        abbreviation: 'SD',
      },
    },
  ],
  meta: {
    pageSize: 2,
    page: 1,
    total: 2,
    count: 2,
  },
};

export default data;