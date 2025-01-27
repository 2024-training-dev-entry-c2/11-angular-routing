import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMenu } from '../../interfaces/menu.interface';
import { Env } from 'src/app/env';


@Injectable({
  providedIn: 'root',
})
export class GetAllMenuService {
  private http = inject(HttpClient);

  execute() {
    return this.http.get<IMenu[]>(Env.API_URL + 'menu');
  }

}
