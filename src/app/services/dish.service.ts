import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish, IDishResponse } from '../interfaces/dish.interface';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private baseUrl = 'http://localhost:8080/api';  

  constructor(private http: HttpClient) {}

  getAllDishesFromMenu(menuId: number): Observable<IDish[]> {
    return this.http.get<IDish[]>(`${this.baseUrl}/menus/${menuId}/dishes`);
  }

  getDishFromMenu(menuId: number, dishId: number): Observable<IDish> {
    return this.http.get<IDish>(`${this.baseUrl}/menus/${menuId}/dishes/${dishId}`);
  }

  addDishToMenu(menuId: number, dish: IDish): Observable<IDish> {
    return this.http.post<IDish>(`${this.baseUrl}/menus/${menuId}/dishes`, dish);
  }

  updateDishInMenu(menuId: number, dishId: number, dish: IDish): Observable<IDish> {
    return this.http.put<IDish>(`${this.baseUrl}/menus/${menuId}/dishes/${dishId}`, dish);
  }

  deleteDishFromMenu(menuId: number, dishId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/menus/${menuId}/dishes/${dishId}`);
  }
}
