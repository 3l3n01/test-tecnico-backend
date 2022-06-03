import { ApiProperty } from '@nestjs/swagger';

export class Meta {
  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  count: number;
}
