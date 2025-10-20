import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CardComponent } from "../../shared/card/card.component";
import { UserDataService } from '../../../core/services/user-data.service';
import { IProducts } from '../../../core/interfaces/products';
import { PopularPipe } from '../../../core/pipes/popular.pipe';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleriaModule, CardComponent, PopularPipe],  //PopularPipe
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
// interface IproductResponseve{
//   products:IProducts[]
// }
export class HomeComponent {
  constructor(private _userDataService:UserDataService) {}
  images: any[] | undefined;
  smallProduct!: IProducts[];
  allProduct!: IProducts[];

ngOnInit() {
    this.images =
    [
      {
          itemImageSrc: '../../../assets/imges/product-3.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
      },
      {
          itemImageSrc: '../../../assets/imges/product-4.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
      },
      {
          itemImageSrc: '../../../assets/imges/product-3.png',
          alt: 'Description for Image 1',
          title: 'Title 1'
      },
      {
          itemImageSrc: '../../../assets/imges/product-4.png',
          alt: 'Description for Image 1',
          title: 'Title 1'
      },
    ]
  this.getAllProduct()
  }

  /*

  */
/* integret with api
  getAllProduct():void {
    this._userDataService.getAllProducts().subscribe((ree) => console.log(ree))
    const storeCart = localStorage.getItem("cartState")
    const cartState = storeCart? JSON.parse(storeCart) : {}
    // this._userDataService.getAllProducts().subscribe((response)=> console.log(response))
    this._userDataService.getAllProducts().subscribe((response: any)=>
    {
      this.smallProduct = response.slice(0,4);
      this.allProduct = response.map((product: IProducts) => {
        return {
          ...product,
          isCart: cartState[product.id] || false
        }
      })
      // console.log(this.allProduct);
    }
    )
  }
*/

  getAllProduct():void {
    this._userDataService.getAllProducts().subscribe((ree) => console.log(ree))
    // this._userDataService.getAllProducts().subscribe((response)=> console.log(response))
    this._userDataService.getAllProducts().subscribe((response: any)=>
    {
      this.smallProduct = response.slice(0,4);
      this.allProduct = response.map((product: IProducts) => {
        return {
          ...product,
          isCart: this._userDataService.isAddToCart(product) || false  // to upgread
        }
      })
      // console.log(this.allProduct);
    }
    )
  }
}
