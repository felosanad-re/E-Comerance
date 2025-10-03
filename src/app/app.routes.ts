import { Routes } from '@angular/router';
import { gurdUser } from '../core/gurdes/auth.gurds';
import { registerGuard } from '../core/gurdes/register.guard';
import path from 'path';

export const routes: Routes = [
  {
    path:"",
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then((c)=> c.AuthLayoutComponent),
    children: [
      {path:'', redirectTo:'login', pathMatch:'full'},
      {path:'login', loadComponent: ()=> import('./pages/login/login.component').then((c)=> c.LoginComponent)},
      {path:'register', loadComponent: ()=> import('./pages/register/register.component').then((c)=>
        c.RegisterComponent),
        canDeactivate: [registerGuard]}
    ]
  },
  {
    path: "", loadComponent: ()=>
    import('./layouts/user-layou/user-layou.component').then((c)=> c.UserLayouComponent),
    canActivate: [gurdUser], // login هنا انا عملت فانشن بتمنع دخول اي حد مش عامل
    children: [
      {path: '', redirectTo:'home', pathMatch:'full'},
      {path: 'home', loadComponent: () => import('./pages/home/home.component').then(
        (c)=> c.HomeComponent)
      },
      {path: 'carts', loadComponent: ()=> import('./pages/carts/carts.component').then(
        (c) => c.CartsComponent)
      },
      {path: 'products', loadComponent: ()=> import('./pages/products/products.component').then(
        (c)=> c.ProductsComponent)
      },
      {path: 'details', loadComponent: ()=> import('./pages/details/details.component').then(
        (c)=> c.DetailsComponent)
      },
      {path: 'category', loadComponent: ()=> import('./pages/category/category.component').then(
        (c)=> c.CategoryComponent)
      },
      {path: '**', loadComponent: ()=> import('./pages/product-not-found/product-not-found.component').then(
        (c)=> c.ProductNotFoundComponent)
      },
    ]
  }
];
