import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMenu } from '../../interfaces/menuResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllMenuService {
  constructor(private http: HttpClient) {}

  execute(): Observable<IMenu[]> {
    return this.http.get<IMenu[]>('http://localhost:8080/menu');
  }
}
