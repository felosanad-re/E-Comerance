import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl, detailsUrl, productUrl } from '../rootapi/base-URL';
import { AddProduct } from '../interfaces/add-product';
import { IProducts } from '../interfaces/products';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(
    private _httpClient:HttpClient,
    private _notificationService:NotificationService
  ) { }
  /*
    * ازاي اخلي اليوسر نيم داينمك
    1- وسويها استرينج فاضي BehaviorSubject بعمل فرتيبل وبعملها من نوع
    2- loginPage بجيب اليوسر نيم من اللوجين حسب الاميل بتاع المستخدم
    3- userPage بعمل داله جوه
  */
  // userName: BehaviorSubject<string> = new BehaviorSubject<string>('') // create a variable to carry username
  /* هعمل دي كدا لاننا لسه في الديفولب مينت ف بتحصل مشكله في عرض اسم اليوسر بعد ما نخلص نشيله اثناء البرودكشن */
  //change username
  userName: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('userName') || '')
  //change value of count

    /******************************************************** start count */
  cartOfCount: BehaviorSubject<number> = new BehaviorSubject(
    (JSON.parse(localStorage.getItem('cartState') ?? "[]") as IProducts[]).length
  );
  //function to use in component
  /*
    * storedCart => بنشي متغير واسجلهفي الاستوريج
    * cart => بعمل تشيك هل الكارت ده موجود او لا
    * بعد كده بعمل الكونديشن اللي هل هو موجود لو موجود يضيفه في علامه الكارت اللي فوق
    * بستعمل الداله في الكومبونانت
  */
  addToCart(product:IProducts) {
    const storedCart = localStorage.getItem('cartState')
    const cart: IProducts[] = storedCart? JSON.parse(storedCart) : []
    if (!product.isCart) {
      product.isCart = true
      cart.push(product)
      localStorage.setItem('cartState', JSON.stringify(cart))
      this._notificationService.showSuccsess('Success', 'item add successfull')
      this.cartOfCount.next(cart.length) // uptade to carts
    }
  }

  // check if it add or not
  isAddToCart(product:IProducts):boolean {
    const storeCart = localStorage.getItem("cartState")
    const cartState = storeCart? JSON.parse(storeCart) : []
    const isAdded = cartState.some((item: IProducts)=> item.id === product.id)
    return isAdded
  }
/******************************************************** end count */

  //show all products
  getAllProducts():Observable<any> {
    return this._httpClient.get(`${productUrl}/products`)
  }

  /* get cart count
  * api not suport carts count مش هستعملهم لان ال
  getCarts(id:string): Observable<any> {
    return this._httpClient.get(`https://dummyjson.com/carts/${id}`) // بعرض العناصر بتاعت الكارت من الفيك اي بي اي
  }
  Add to carts
  addToCart(userData: { userId: number, products: [{ id: number, quantity: number }] }): Observable<any> {
  return this._httpClient.post(`${productUrl}/carts/add`, userData);
  }
 */

  //AllCategory
  getAllCategory():Observable<any> {
    return this._httpClient.get(`${productUrl}/categories`)
  }
  //SpecificCategory
  getSpecificCategory(categoryType:string):Observable<any> {
    return this._httpClient.get(`${productUrl}/products`, {params: {slug: categoryType}})
  }
  // details
  getAllDetails(id:string):Observable<any> {
    return this._httpClient.get(`${detailsUrl}/${id}`)
  }
}
