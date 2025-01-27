import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../inferfaces/add-menu.interface';

@Injectable({
  providedIn: 'root'
})
export class DishService {
private http = inject(HttpClient);
  urlbase= 'http://localhost:8080/api/dish';

  addDish(payload: IDish): Observable<IDish> {
    return this.http.post<IDish>(this.urlbase, payload);
  }
 updateDish(dish: IDish): Observable<IDish> {
    return this.http.put<IDish>(`${this.urlbase}/${dish.id}`, dish);
  }

  deleteDishById(id: number): Observable<void> {
    console.log(id)
      const confirmed = window.confirm(
        '¿Estás seguro de que deseas eliminar este plato?'
      );
      if (confirmed) {
        return this.http.delete<void>(`${this.urlbase}/${id}`);
      } else {
        return new Observable<void>();
      }
    }
}
