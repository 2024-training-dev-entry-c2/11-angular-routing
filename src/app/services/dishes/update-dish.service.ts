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
export class UpdateDishService {

  http = inject(HttpClient);
  #findAllDishesService = inject(FindAllDishesService);

  constructor() { }

  execute(id: number, body: ICreateDish):Observable<IDish>{
    return this.http.put<IDish>(`${environment.api}/dishes/${id}`, body)
    .pipe(
      tap(this.#findAllDishesService.execute().subscribe())
    );
  }

}
