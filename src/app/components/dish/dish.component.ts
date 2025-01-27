import { Component, ViewChild } from '@angular/core';
import { DishHeaderComponent } from "../dish-content/dish-header/dish-header.component";
import { SearchComponent } from "../search/search.component";
import { DishMainComponent } from "../dish-content/dish-main/dish-main.component";
import { IDish } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-dish',
  imports: [DishHeaderComponent, SearchComponent, DishMainComponent],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.scss'
})
export class DishComponent {
  menu = { menuId: 1, menuName: 'Menu1' };
  searchQuery: string = ''; 

  @ViewChild(DishMainComponent) dishMainComponent!: DishMainComponent;

  onSearchQueryChange(query: string): void {
    this.searchQuery = query; 
  }

  onDishAdded(newDish: IDish): void {
    // this.dishMainComponent.addDish(newDish);
  }
}
