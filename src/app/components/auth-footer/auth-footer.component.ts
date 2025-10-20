import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
@Component({
  selector: 'app-auth-footer',
  standalone: true,
  imports: [IconFieldModule],
  templateUrl: './auth-footer.component.html',
  styleUrl: './auth-footer.component.scss'
})
export class AuthFooterComponent {

}
