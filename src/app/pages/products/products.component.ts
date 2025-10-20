import { Component } from '@angular/core';
import { UserDataService } from '../../../core/services/user-data.service';
import { IProducts } from '../../../core/interfaces/products';
import { CardComponent } from "../../shared/card/card.component";
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SearcProductPipe } from '../../../core/pipes/searc-product.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent, InputIconModule, IconFieldModule, InputTextModule, FormsModule, SearcProductPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(private _userDataService:UserDataService){
  }
  allProducts: IProducts[] =[];
  searchKey: string = '';

  ngOnInit() {
    this.getAllProduct()
  }
  getAllProduct():void {
    this._userDataService.getAllProducts().subscribe((ree) => console.log(ree))
    const storeCart = localStorage.getItem("cartState")
    // this._userDataService.getAllProducts().subscribe((response)=> console.log(response))
    this._userDataService.getAllProducts().subscribe((response: any)=>
    {
      this.allProducts = response.map((product: IProducts) => {
        return {
          ...product,
          isCart: this._userDataService.isAddToCart(product) || false
        }
      })
      // console.log(this.allProduct);
    }
    )
  }
}
