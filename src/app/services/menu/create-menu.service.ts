import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateMenu } from '@interfaces/create-menu.interface';
import { IMenu } from '@interfaces/menu.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FindAllMenusService } from './find-all-menus.service';
import { ICreateDish } from '@interfaces/create-dish.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateMenuService {

  #findAllMenuService = inject(FindAllMenusService);
  http = inject(HttpClient);

  constructor() { }

  execute(body: ICreateMenu): Observable<IMenu>{
    return this.http.post<IMenu>(`${environment.api}/menu`, body)
    .pipe(
      tap(this.#findAllMenuService.execute().subscribe())
    );
  }

}
