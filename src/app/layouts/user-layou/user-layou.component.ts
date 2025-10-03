import { Component } from '@angular/core';
import { UserNavComponent } from "../../components/user-nav/user-nav.component";
import { UserFooterComponent } from "../../components/user-footer/user-footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layou',
  standalone: true,
  imports: [UserNavComponent, UserFooterComponent, RouterOutlet],
  templateUrl: './user-layou.component.html',
  styleUrl: './user-layou.component.scss'
})
export class UserLayouComponent {

}
