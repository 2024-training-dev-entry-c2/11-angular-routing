import { Component, inject } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { IRestaurant } from '../../inferfaces/restaurant.interface';


@Component({
  selector: 'app-main-content',
  imports: [],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
 private restaurantService = inject(RestaurantService);
 infoRestaurant: IRestaurant[] = [];
 ngOnInit() {
     this.restaurantService.execute().subscribe({
       next: (data: IRestaurant[]) => {
         this.infoRestaurant = data;
         console.log(this.infoRestaurant)
       },
       error: (error) => {
         console.error('Error al obtener la informacion', error);
       }
     });
   }
}
