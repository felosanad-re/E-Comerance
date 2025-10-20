import { Component } from '@angular/core';
import { ICategories, IProducts } from '../../../core/interfaces/products';
import { UserDataService } from '../../../core/services/user-data.service';
import { CardComponent } from "../../shared/card/card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  constructor(private _userDataService:UserDataService){}
  allCategory: ICategories[] = []

  ngOnInit():void {
    this.getAllCategory()
  }
  getAllCategory():void {
    this._userDataService.getAllCategory().subscribe((res:ICategories[]) => {
      this.allCategory = res
    } )
    // this._userDataService.getAllCategory().subscribe((res:any) => console.log("res", res))
  }
}
