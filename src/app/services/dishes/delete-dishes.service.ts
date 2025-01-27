import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { FindAllDishesService } from './find-all-dishes.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteDishesService {
  #findAllDishesService = inject(FindAllDishesService);
  http = inject(HttpClient);

  constructor() { }

  execute(id: number) {
    return this.http.delete(`${environment.api}/dishes/${id}`)
    .pipe(
      tap(this.#findAllDishesService.execute().subscribe())
    );
  }
}
