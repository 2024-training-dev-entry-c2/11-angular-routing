import { inject, Injectable } from '@angular/core';
import { FindAllMenusService } from './find-all-menus.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMenu } from '@interfaces/menu.interface';
import { DeleteMenuService } from './delete-menu.service';
import { ICreateMenu } from '@interfaces/create-menu.interface';
import { CreateMenuService } from './create-menu.service';
import { UpdateMenuService } from './update-menu.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  #findAllMenusService = inject(FindAllMenusService);
  #deleteMenuService = inject(DeleteMenuService);
  #createMenuService = inject(CreateMenuService);
  #updateMenuService = inject(UpdateMenuService);
  menuObserver = new BehaviorSubject<boolean>(false);

  constructor() { }

  findAll(): Observable<IMenu[]>{
    return this.#findAllMenusService.execute();
  }

  remove(id: number){
    return this.#deleteMenuService.execute(id).subscribe({
      next: () => {
        this.menuObserver.next(true);
      }
    })
  }

  create(body: ICreateMenu): Observable<IMenu>{
    return this.#createMenuService.execute(body);
  }

  update(menuId: number, body: ICreateMenu): Observable<IMenu> {
    return this.#updateMenuService.execute(menuId, body);
  }

}
