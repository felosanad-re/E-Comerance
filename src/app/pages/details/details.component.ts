import { myDetailsResolver } from './../../../core/gurdes/my-details.resolver';
import { Component } from '@angular/core';
import { UserDataService } from '../../../core/services/user-data.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IProducts } from '../../../core/interfaces/products';
import { ButtonModule } from 'primeng/button';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ButtonModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  constructor(
    private _userDataService:UserDataService,
    private _activatedRoute:ActivatedRoute,
  ){}
  id:number = 0;
  products!: IProducts; // => can't read some properties solve it with resolver
  // products: IProducts = {} as IProducts
  isCart:boolean = false;
  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((res:any)=> {
      console.log("param", res);
      this.id = res.params['id'] // params =>params راجعلي في اوبجيكت اسمه  id لان ال
    })
    this.displayDetails()
  }
  displayDetails():void {
    this._activatedRoute.data.subscribe((data:any) => {
      console.log(data);
      this.products = {
        ...data.details,
        isCart: this._userDataService.isAddToCart(data.details)
      }
    })
  }
  /* old way
  addNewProduct(products: [{ id: number, quantity: number }]): void {
  const userId = Number(localStorage.getItem("token")) || 1;
  this._userDataService.addToCart({ userId, products }).subscribe((respone) => {
    this._notificationService.showSuccsess("Success", "add successful")
    // console.log(respone);
    this._userDataService.cartOfCount.next(products.length)
    this.isCart = true; // it will relasez for all elemnts => i have to slovle it
    const storeCart = localStorage.getItem("cartState")
    const cartState = storeCart? JSON.parse(storeCart) : {}
    for (const product of products) {
      cartState[product.id]= true
    }
    localStorage.setItem("cartState", JSON.stringify(cartState))
  });
}
*/
  addToCart(product: IProducts) {
    this._userDataService.addToCart(product)
  }
}
