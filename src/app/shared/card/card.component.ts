import { IProducts } from '../../../core/interfaces/products';
import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from "primeng/menubar";
import { UserDataService } from '../../../core/services/user-data.service';
import { NotificationService } from '../../../core/services/notification.service';
import { NotFoundComponent } from "../page-not-found/not-found/not-found.component";


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, ButtonModule, MenubarModule, NotFoundComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  constructor(private _userDataService:UserDataService, private _notificationService:NotificationService){}

  @Input({required:true})  isSmall: boolean = false
  @Input({required:true}) products!: IProducts[]
  @Input() searchKey: string = ''
  isCart:boolean = true

  /* old way with api integrate
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
