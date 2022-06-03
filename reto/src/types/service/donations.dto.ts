import { ApiProperty } from '@nestjs/swagger';

import { Currency } from './currency.dto';
import { Country } from './country.dto';
import { Organization } from './organization.dto';

export class Donations {
  @ApiProperty()
  id: number | string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  currency: Currency;

  @ApiProperty()
  organization: Country;

  @ApiProperty()
  country: Organization;
}
