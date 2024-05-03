import { ApiProperty } from "@nestjs/swagger"

export class CreateCategoryAttributeDto {
    @ApiProperty()
    categoryId: number
    @ApiProperty()
    attributeNameId: number
}
