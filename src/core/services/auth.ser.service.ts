import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iregister } from '../interfaces/iregister';
import { baseUrl, logInUrl } from '../rootapi/base-URL'; // تبع الكود الاصل الملف اللي كنت ببعت منه رابط البوست مان
import { ILogin } from '../interfaces/ilogin';

@Injectable({
  providedIn: 'root'
})
export class AuthSerService {
/*
  * *** عملت ملف بروكسي وضفت فيه الموقع API هنا علشان اشغل ال
  * *** واعمل اوبشن للبروكسي انه يقراه serve تاني حاجه بدخل في ملف الانجولر جيسون واعدل الكود الموجود في ال
  * *** بعدل الكود زي اللي كتبته تحت
  * ده كود الانجولر جيسون
  * "options": {
  *  "proxyConfig": "proxy.conf.json"
  * }
  * }
*/
  constructor(private _httpClient:HttpClient) {}
  // for register form
  register(registerData: Iregister):Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/v1/users/`, registerData)// الكود الاساسي بتاع الكورس
    // return this._httpClient.post("/api/users", registerData) // ده كود البروكسي
  }

  // for login form
  logIn(logInData: ILogin):Observable<any>{
    return this._httpClient.post(`${logInUrl}/auth/login`, logInData)
  }
  authorized(){
    if (localStorage.getItem('token') != null) {
      return true
    } else return false
  }
}
