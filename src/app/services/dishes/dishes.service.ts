import { inject, Injectable } from '@angular/core';
import { FindAllDishesService } from './find-all-dishes.service';
import { IDish } from '@interfaces/dish.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeleteDishesService } from './delete-dishes.service';
import { ICreateDish } from '@interfaces/create-dish.interface';
import { CreateDishService } from './create-dish.service';
import { UpdateDishService } from './update-dish.service';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  #findAllDishesService = inject(FindAllDishesService);
  #deleteDishesService = inject(DeleteDishesService);
  #createDishService = inject(CreateDishService);
  #updateDishService = inject(UpdateDishService);

  observerChanges = new BehaviorSubject<boolean>(false);


  constructor() { }

  findAll(): Observable<IDish[]> {
    return this.#findAllDishesService.execute();
  }

  remove(id: number){

    return this.#deleteDishesService.execute(id).subscribe({
      next: () => {
        this.observerChanges.next(true);
      }
    });
  }

  create(menuId: number, body: ICreateDish):Observable<IDish>{
    return this.#createDishService.execute(menuId, body);
  }

  update(id: number, body: ICreateDish){
    return this.#updateDishService.execute(id, body);

  }
}
