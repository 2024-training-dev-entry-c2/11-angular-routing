import { Component, OnInit } from '@angular/core';
import { DishCardComponent } from './dish-card/dish-card.component';
import { GetAllDishesService } from '../../../services/dish/get-all-dishes.service';
import { IDish } from '../../../interfaces/dishResponse.interface';
import { AddComponent } from '../../custom/add/add.component';
import { TitleComponent } from '../../custom/title/title.component';
import { interval, Subscription, switchMap } from 'rxjs';
import { NoDataComponent } from '../../custom/no-data/no-data.component';

@Component({
  selector: 'app-dish',
  imports: [DishCardComponent, AddComponent, TitleComponent, NoDataComponent],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.scss',
})
export class DishComponent implements OnInit {
  dishes: IDish[] = [];
  title = 'Dishes ';
  addLink = '/dish/add';
  private refreshSubscription!: Subscription;

  constructor(private getAllDishesService: GetAllDishesService) {}

  ngOnInit(): void {
    this.refreshSubscription = interval(100)
      .pipe(switchMap(() => this.getAllDishesService.execute()))
      .subscribe({
        next: (data) => (this.dishes = data),
        error: (err) => console.error('Error fetching dishes:', err),
      });
  }

  trackByFn(index: number, dish: IDish): number {
    return dish.id;
  }
  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
