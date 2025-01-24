import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDish } from '../../interfaces/dishResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllDishesService {
  constructor(private http: HttpClient) {}

  execute(): Observable<IDish[]> {
    return this.http.get<IDish[]>('http://localhost:8080/dishes');
  }
}
