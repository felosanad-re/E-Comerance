import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterLink } from '@angular/router';
import { UserDataService } from '../../../core/services/user-data.service';
import { AuthSerService } from '../../../core/services/auth.ser.service';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, RouterLink],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UserNavComponent {
  constructor(
    private _userDataService:UserDataService,
    private _authSerService:AuthSerService,
    private _router:Router
  ){}

items: MenuItem[] | undefined;
logOutIcone: boolean = false;
userName:string= '';
cartCount: number = 0
ngOnInit() {
  this.getUSerName();
  this.getUserCartCount()
    this.items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            path: 'home'
          },
          {
            label: 'products',
            icon: 'pi pi-sparkles',
            path: 'products'
          },
          {
            label: 'category',
            icon: 'pi pi-th-large',
            path: 'category'
        },
        // {
        //     label: 'Contact',
        //     icon: 'pi pi-envelope',
        //     badge: '3'
        // }
    ];

    this._userDataService.cartOfCount.subscribe((next) => {
      this.cartCount = next
    })
}

getUSerName():void {
  this._userDataService.userName.subscribe((next)=> this.userName=next) // هنا انا بعمل داله بتجيب اسم المستخد من صفحه تسجيل الدخول واعرضه في صفحه الهوم
}
getUserCartCount():void {
  const id = localStorage.getItem('token') ?? ''
  this._userDataService.cartOfCount.subscribe((next)=> console.log(next))
  this._userDataService.cartOfCount.subscribe((next)=> this.cartCount= next)
}
 /* مش هيشتغل لان الي بي اي اللي معايا مفهاش تسجيل خروج */
logOut(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.setItem("defultName", 'login');
  this.userName = 'login'
  this._userDataService.userName.next('login')
}
}
