import { Component, inject } from '@angular/core';
import { BottonEditComponent } from "../botton-edit/botton-edit.component";
import { BottonDeleteComponent } from "../botton-delete/botton-delete.component";
import { RestaurantService } from '../../services/restaurant.service';
import { IRestaurant } from '../../inferfaces/restaurant.interface';
import { Dish, IAddMenuRequest } from '../../inferfaces/add-menu.interface';

@Component({
  selector: 'app-get-menu',
  imports: [BottonEditComponent, BottonDeleteComponent],
  templateUrl: './get-menu.component.html',
  styleUrl: './get-menu.component.scss'
})
export class GetMenuComponent {
 private restaurantService = inject(RestaurantService);
 infoRestaurant: IRestaurant | null = null;
 dishes: Dish[] = [];
 menuDescription: string = '';
 restaurantId: number = 0;

 ngOnInit() {
   this.restaurantService.execute().subscribe({
     next: (data: IRestaurant) => {
       this.infoRestaurant = data;
       this.dishes = this.infoRestaurant.menuRestaurant.dishes;
       this.menuDescription = this.infoRestaurant.menuRestaurant.description;
       this.restaurantId = this.infoRestaurant.id;
       console.log(this.infoRestaurant);
     },
     error: (error) => {
       console.error('Error al obtener la informacion', error);
     }
   });
 }
}
