import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMenu } from '../../interfaces/menu.interface';


@Injectable({
  providedIn: 'root',
})
export class GetAllMenuService {
  private apiUrl = 'http://localhost:8080/api/v1/menu';

  private http = inject(HttpClient);


  execute() {
    return this.http.get<IMenu[]>(this.apiUrl);
  }

}
