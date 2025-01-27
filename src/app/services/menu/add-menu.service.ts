import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu } from '../../interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class AddMenuService {
  private http = inject(HttpClient);

  execute(customer: Partial<IMenu>): Observable<IMenu> {
    return this.http.post<IMenu>('http://localhost:8080/api/v1/menu',customer);
  }

}