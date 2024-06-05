import { OmitType, PartialType } from '@nestjs/swagger';

import { RegisterDto } from 'src/auth/dto/auth.dto';

export class UpdateUserDto extends PartialType(OmitType(RegisterDto, ['password', 'email'])) {}
