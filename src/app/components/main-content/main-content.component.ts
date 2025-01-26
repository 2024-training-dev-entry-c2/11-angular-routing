import { Component, inject } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { IRestaurant } from '../../inferfaces/restaurant.interface';
import { Dish } from '../../inferfaces/create-orden.interface';
import { CurrencyPipe, DatePipe, registerLocaleData, UpperCasePipe } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');
@Component({
  selector: 'app-main-content',
  imports: [CurrencyPipe, UpperCasePipe, DatePipe],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
 private restaurantService = inject(RestaurantService);
 infoRestaurant: IRestaurant | null = null;
 dishes: Dish[] | null = null;
 popularDishes: Dish[] = [];
 openingDate: Date = new Date();
 closingDate: Date = new Date();

 ngOnInit() {
     this.restaurantService.execute().subscribe({
       next: (data: IRestaurant) => {
         this.infoRestaurant = data;
         console.log(this.infoRestaurant)
         this.closingDate.setHours(this.infoRestaurant.closingHours[0]);
         this.closingDate.setMinutes(this.infoRestaurant.closingHours[1]);
         this.openingDate.setHours(this.infoRestaurant.openingHours[0]);
         this.openingDate.setMinutes(this.infoRestaurant.openingHours[1]);
         this.dishes = this.infoRestaurant.menuRestaurant.dishes;
         this.popularDishes = this.dishes.filter(dish => dish.popular);
       },
       error: (error) => {
         console.error('Error al obtener la informacion', error);
       }
     });
   }
}
