import { Routes } from '@angular/router';
import { gurdUser } from '../core/gurdes/auth.gurds';

export const routes: Routes = [
  {
    path:"",
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then((c)=> c.AuthLayoutComponent),
    children: [
      {path:'', redirectTo:'login', pathMatch:'full'},
      {path:'login', loadComponent: ()=> import('./pages/login/login.component').then((c)=> c.LoginComponent)},
      {path:'register', loadComponent: ()=> import('./pages/register/register.component').then((c)=> c.RegisterComponent)}
    ]
  },
  {
    path: "user", loadComponent: ()=>
    import('./layouts/user-layou/user-layou.component').then((c)=> c.UserLayouComponent),
    canActivate: [gurdUser] // login هنا انا عملت فانشن بتمنع دخول اي حد مش عامل
  }
];
