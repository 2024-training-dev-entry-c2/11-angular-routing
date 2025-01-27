import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateMenu } from '@interfaces/create-menu.interface';
import { IMenu } from '@interfaces/menu.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FindAllMenusService } from './find-all-menus.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuService {
  #findAllMenuService = inject(FindAllMenusService);
  http = inject(HttpClient);

  constructor() { }

  execute(menuId: number, body: ICreateMenu):Observable<IMenu>{
    return this.http.put<IMenu>(`${environment.api}/menu/${menuId}`, body)
    .pipe(
      tap(this.#findAllMenuService.execute().subscribe())
    );
  }

}
