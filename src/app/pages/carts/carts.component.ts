import { Component } from '@angular/core';
import { IProducts } from '../../../core/interfaces/products';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [DataViewModule, ButtonModule, TagModule, CommonModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.scss'
})
export class CartsComponent {
  constructor(private _notificationService:NotificationService){}
  allProductsCart: IProducts[] = []

  ngOnInit() {
    if (localStorage.getItem("cartState") !== null) // لو في عناصر موجوده جوه الذاكره
    {
      this.allProductsCart = JSON.parse(
        localStorage.getItem("cartState") || ''  // لو موجود حطلي كل العناصر في البروبيرتي دي
      )
    }
  }

  clearCart():void {
    localStorage.removeItem("cartState")
    this._notificationService.showSuccsess('Success', "You remove your carts")
    this.allProductsCart = []
  }
}
