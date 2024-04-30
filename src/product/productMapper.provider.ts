import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities';
import { ProductViewDto } from './dto/productView.dto';
// import { MapperType } from 'src/types';

type MapperType<TIncome, TOut> = 
    (obj: TIncome) => TOut


interface IProductMapper {
    map: <Product, ProductViewDto> (obj: Product) => ProductViewDto
  }

@Injectable()
export class ProductMapper implements IProductMapper {
  map: <Product, ProductViewDto>(obj: Product) => ProductViewDto;

}

