import { Component } from '@angular/core';
import { MenuItemComponent } from "../menu-item/menu-item.component";
import { AuthService } from '../../services/auth.service';

export interface IMenuItem{
  iconSrc: string,
  menuTitle: string
  href: string
}

@Component({
  selector: 'app-sidebar',
  imports: [MenuItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  

  constructor(private authService: AuthService){

  }

  logOut(){
    console.log("look up")
    this.authService.logout();
  }

  menus: IMenuItem[] =  [
    {
      iconSrc: "assets/svg/bank_side.svg",
      menuTitle: "Account",
      href: "/dashboard/accounts"
    }
  ]

}
