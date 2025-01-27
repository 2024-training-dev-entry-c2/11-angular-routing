import { Component } from '@angular/core';
import { MenuNavbarComponent } from "../menu-navbar/menu-navbar.component";

@Component({
  selector: 'app-navbar',
  imports: [MenuNavbarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
