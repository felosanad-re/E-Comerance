import { ICategories, IProducts } from './../../../core/interfaces/products';
import { Component } from '@angular/core';
import { UserDataService } from '../../../core/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from "../../shared/card/card.component";

@Component({
  selector: 'app-specific-category',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.scss'
})
export class SpecificCategoryComponent {
  constructor(
    private _userDataService:UserDataService,
    private _activatedRoute:ActivatedRoute
  ){}

  categoryType: string = ''
  products: IProducts[] = []
  ngOnInit() {
    this.categoryType =  this._activatedRoute.snapshot.paramMap.get('type') || '';
    this.CategorySpecific(this.categoryType)
    // console.log(this.categoryType);
  }

  CategorySpecific(type:string){
    this._userDataService.getSpecificCategory(type).subscribe((res: IProducts[]) => {
      this.products = res.filter((item) => item.category?.slug === type)
      // console.log('res', res);
    })
  }

}

// getCategoryType() // url هجيبه من
// {
//    this._activatedRoute.snapshot.paramMap.get('type') // if i have one dynamic
//   this._activatedRoute.snapshot.paramMap.getAll('type') // if i have more than one
//   console.log( this._activatedRoute.snapshot.paramMap.has('type')); // returns boolean value
//   console.log( this._activatedRoute.snapshot.paramMap.keys); // reteurn keys
// }
