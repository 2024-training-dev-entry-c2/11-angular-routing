import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IDish } from '@interfaces/dish.interface';
import { DishesService } from '@services/dishes/dishes.service';
import { ContainerComponent } from '@shared/container/container.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-view-dishes',
  imports: [CommonModule, ContainerComponent],
  templateUrl: './view-dishes.component.html',
  styleUrl: './view-dishes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewDishesComponent implements OnInit {

  dishesService = inject(DishesService);
  header: string[] = ['id', 'nombre', 'categoria', 'precio'];

  dishes = new BehaviorSubject<IDish[]>([]);

  changes=signal<boolean>(false);

  router = inject(Router);
  constructor(){
    effect(() => {
      if (this.changes()) {
        this.loadDishes();
      }
    });
  }
  ngOnInit(): void {
    this.dishesService.observerChanges.subscribe(event =>this.changes.set(event));
    this.loadDishes();
  }

  loadDishes() {
    this.dishesService.findAll().subscribe(data => this.dishes.next(data));
  }

 
 }
