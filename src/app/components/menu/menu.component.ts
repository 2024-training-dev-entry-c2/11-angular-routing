import { Component } from '@angular/core';
import { MenuHeaderComponent } from "../menu-content/menu-header/menu-header.component";
import { SearchComponent } from "../search/search.component";
import { MenuMainComponent } from "../menu-content/menu-main/menu-main.component";

@Component({
  selector: 'app-menu',
  imports: [MenuHeaderComponent, SearchComponent, MenuMainComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
 
}
