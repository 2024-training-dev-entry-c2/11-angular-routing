import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IMenuResponse } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class ListMenusService {
  private http = inject(HttpClient);

  execute(): Observable<IMenuResponse[]> {
    return this.http.get<IMenuResponse[]>(environment.apiUrl + '/menu/active');
  }
}
