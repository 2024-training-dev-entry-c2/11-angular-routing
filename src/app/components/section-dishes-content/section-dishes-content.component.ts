import { Component, inject, input, OnInit } from '@angular/core';
import { getDishService} from '../../services/dishes.service';
import { MainSectionDishesComponent } from "../main-section-dishes/main-section-dishes.component";
import { IDishes } from '../../interface/dishes.interface';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-section-dishes-content',
  imports: [MainSectionDishesComponent],
  templateUrl: './section-dishes-content.component.html',
  styleUrl: './section-dishes-content.component.scss'
})
export class SectionDishesContentComponent implements OnInit{

 data: IDishes[] = [];

  public tableContent = {
    headers: ['Dish ID', 'Name', 'Price', 'Menu ID', 'Dish  Type','Times Ordered' ,'Actions'],

  }


  private dishService = inject(getDishService);

  ngOnInit(): void {
      this.dishService
        .getData()
        .pipe(
          map((response) => response),
          catchError((error) => {
            console.error('Error fetching data:', error);
            return of([]); 
          })
        )
        .subscribe((response: IDishes[]) => {
          this.data = response; 
        });
    }


}
