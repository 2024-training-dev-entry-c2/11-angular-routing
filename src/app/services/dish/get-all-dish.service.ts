import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDish } from '../../interfaces/dish.interface';
import { Observable } from 'rxjs';
import { Env } from '../../env';



@Injectable({
  providedIn: 'root',
})
export class GetAllDishService {
  private apiUrl = Env.API_URL + 'dish';

  private http = inject(HttpClient);


  execute():Observable<IDish[]> {
    return this.http.get<IDish[]>(this.apiUrl);
  }

}
