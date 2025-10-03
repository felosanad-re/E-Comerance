import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, RouterLink],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UserNavComponent {
items: MenuItem[] | undefined;

ngOnInit() {
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
}
}
