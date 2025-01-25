import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IDishes, IDishesResponse } from '../interface/dishes.interface';
import { DataManagementService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class getDishService {
  private apiUrl = 'http://localhost:8080/api/dishes';
  
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
}
