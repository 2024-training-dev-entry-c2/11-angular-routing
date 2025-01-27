import { Component } from '@angular/core';
import { DishListComponent } from "../../../components/organisms/dish-list/dish-list.component";

@Component({
  selector: 'app-list',
  imports: [DishListComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

}
