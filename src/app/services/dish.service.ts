import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish, IDishResponse } from '../interfaces/dish.interface';

// En tu servicio `dish.service.ts` asegúrate de que estos métodos estén definidos correctamente:

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private baseUrl = 'http://localhost:8080/api';  // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los platos de un menú
  getAllDishesFromMenu(menuId: number): Observable<IDish[]> {
    return this.http.get<IDish[]>(`${this.baseUrl}/menus/${menuId}/dishes`);
  }

  // Obtener un plato específico del menú
  getDishFromMenu(menuId: number, dishId: number): Observable<IDish> {
    return this.http.get<IDish>(`${this.baseUrl}/menus/${menuId}/dishes/${dishId}`);
  }

  // Agregar un plato al menú
  addDishToMenu(menuId: number, dish: IDish): Observable<IDish> {
    return this.http.post<IDish>(`${this.baseUrl}/menus/${menuId}/dishes`, dish);
  }

  // Actualizar un plato en el menú
  updateDishInMenu(menuId: number, dishId: number, dish: IDish): Observable<IDish> {
    return this.http.put<IDish>(`${this.baseUrl}/menus/${menuId}/dishes/${dishId}`, dish);
  }

  // Eliminar un plato del menú
  deleteDishFromMenu(menuId: number, dishId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/menus/${menuId}/dishes/${dishId}`);
  }
}
