import { ApiProperty } from '@nestjs/swagger';

export class Element {
  @ApiProperty()
  name: string;

  @ApiProperty()
  abbreviation: string;
}
