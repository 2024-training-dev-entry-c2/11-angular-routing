import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu } from '../../interfaces/menu.interface';
import { Env } from 'src/app/env';

@Injectable({
  providedIn: 'root',
})
export class AddMenuService {
  private http = inject(HttpClient);

  execute(customer: Partial<IMenu>): Observable<IMenu> {
    return this.http.post<IMenu>(Env.API_URL + 'menu',customer);
  }

}