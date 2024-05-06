import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;
}