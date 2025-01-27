import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDish } from '@interfaces/dish.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FindAllDishesService {

  http = inject(HttpClient);

  constructor() { }

  execute():Observable<IDish[]>{
    return this.http.get<IDish[]>(`${environment.api}/dishes`)
    .pipe(
      tap(console.log)
    );
  }
}
