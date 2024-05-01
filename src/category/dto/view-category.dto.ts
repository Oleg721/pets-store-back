import { CategoryAttribute } from "src/entities"
import { ProductViewDto } from "src/product/dto/productView.dto"

export class CreateViewDto {
    id: number
    
    name: string

    description: string
    
    parentId: number

    parent?: CreateViewDto

    children?: CreateViewDto[]

    products?: ProductViewDto[]

    categoryAttributes?: {name: string, type: string}[]
}
