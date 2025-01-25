import { Component, inject, input, OnInit } from '@angular/core';
import { getDishService} from '../../services/dishes.service';
import { MainSectionDishesComponent } from "../main-section-dishes/main-section-dishes.component";

@Component({
  selector: 'app-section-dishes-content',
  imports: [MainSectionDishesComponent],
  templateUrl: './section-dishes-content.component.html',
  styleUrl: './section-dishes-content.component.scss'
})
export class SectionDishesContentComponent implements OnInit{

  dishData: any;
  public userData = input<any>();

  public tableContent = {
    headers: ['Dish ID', 'Name', 'Price', 'Menu ID', 'Dish  Type','Times Ordered' ,'Actions'],

  }


  private dishService = inject(getDishService);

  ngOnInit(): void {
    this.dishService.getMenu().subscribe(
      (response) => {
        this.dishData = response;
        console.log(this.dishData); // For debugging purposes
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


}
