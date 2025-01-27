import { Component } from '@angular/core';
import { GetMenuComponent } from '../get-menu/get-menu.component';
import { AddDishComponent } from '../add-dish/add-dish.component';




@Component({
  selector: 'app-menu',
  imports: [GetMenuComponent, AddDishComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {

}
