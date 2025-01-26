import { HttpClient } from '@angular/common/http';
import {Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IDishes } from '../interface/dishes.interface';
import { DataManagementService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class getDishService {
  private apiUrl = 'http://localhost:8080/api/dishes';
    private dishToDeleteSubject = new BehaviorSubject<IDishes | null>(null);
    private dishToDelete$ = this.dishToDeleteSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private dataManagementService: DataManagementService<IDishes>
  ) {}

  getData() {
    return this.http.get<IDishes[]>(this.apiUrl).pipe(
      tap(data => this.dataManagementService.updateData(data))
    );
  }
    
  postData(client: IDishes) {
    return this.http.post<IDishes>(this.apiUrl, client).pipe(
      tap(newClient => this.dataManagementService.addItem(newClient))
    );
  }


  setDishToDelete(dish: IDishes) {
    this.dishToDeleteSubject.next(dish);
  }

  getDishToDelete() {
    return this.dishToDelete$;
  }

  deleteData(dishId: number) {
    return this.http.delete<IDishes>(`${this.apiUrl}/${dishId}`).pipe(
      tap(() => {
        this.dataManagementService.removeItem(dish => dish.id === dishId);
      })
    );
  }
}
