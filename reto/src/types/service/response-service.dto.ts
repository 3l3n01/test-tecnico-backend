import { ApiProperty } from '@nestjs/swagger';

import { Donations } from './donations.dto';
import { Meta } from './meta.dto';

export class ResponseService {
    @ApiProperty()
    data: Donations[];

    @ApiProperty()
    meta: Meta;
}
