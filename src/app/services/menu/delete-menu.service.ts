import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FindAllMenusService } from './find-all-menus.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteMenuService {;
  http = inject(HttpClient);
  #findAllMenusService = inject(FindAllMenusService);

  constructor() { }

  execute(id: number){
    return this.http.delete(`${environment.api}/menu/${id}`)
    .pipe(
      tap(this.#findAllMenusService.execute().subscribe())
    );
  }
}
