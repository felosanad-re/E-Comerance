import { Component } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

import { RippleModule } from 'primeng/ripple';
import { UserDataService } from '../../../core/services/user-data.service';

@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [MenubarModule, RippleModule, RouterLinkActive],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.scss'
})
export class AuthNavComponent {
items: MenuItem[] | undefined;

ngOnInit() {
    this.items = [
        {
            label: 'login',
            icon: 'pi pi-sign-in',
            path: "login"
        },
        {
            label: 'register',
            icon: 'pi pi-user-plus',
            path: "register"
        },
    ];
}

}
