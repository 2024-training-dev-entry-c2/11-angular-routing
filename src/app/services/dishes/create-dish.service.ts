import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateDish } from '@interfaces/create-dish.interface';
import { IDish } from '@interfaces/dish.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FindAllDishesService } from './find-all-dishes.service';

@Injectable({
  providedIn: 'root'
})
export class CreateDishService {
  #findAllDishesService = inject(FindAllDishesService)

  http = inject(HttpClient);

  constructor() { }

  execute(menuId: number, body: ICreateDish):Observable<IDish>{
    return this.http.post<IDish>(`${environment.api}/dishes/menu/${menuId}`, body)
    .pipe(
      tap(this.#findAllDishesService.execute().subscribe())
    );
  }

}
