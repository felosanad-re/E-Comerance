import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../interfaces/products';

@Pipe({
  name: 'searcProduct',
  standalone: true
})
export class SearcProductPipe implements PipeTransform {

  transform(products: IProducts[], serachKey: string): IProducts[]  {
    return products.filter((products)=> products.title.toLowerCase().includes(serachKey))
  }
}
