import { Component, ViewChild } from '@angular/core';
import { MenuHeaderComponent } from "../menu-content/menu-header/menu-header.component";
import { SearchComponent } from "../search/search.component";
import { MenuMainComponent } from "../menu-content/menu-main/menu-main.component";
import { IMenu } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-menu',
  imports: [MenuHeaderComponent, SearchComponent, MenuMainComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  searchQuery: string = ''; 

  @ViewChild(MenuMainComponent) menuMainComponent!: MenuMainComponent;

  onSearchQueryChange(query: string): void {
    this.searchQuery = query; 
  }

  onMenuAdded(newMenu: IMenu): void {
    this.menuMainComponent.addMenu(newMenu);
  }
}
