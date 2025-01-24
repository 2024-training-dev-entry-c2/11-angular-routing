import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteMenuService {
  private apiUrl = 'http://localhost:8080/menu';

  constructor(private http: HttpClient) {}

  deleteMenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
