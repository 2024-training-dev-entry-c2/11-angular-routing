import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IMenu } from '../interface/menus.interface';
import { DataManagementService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class getMenusService {
  private apiUrl = 'http://localhost:8080/api/menus';
  private menuToDeleteSubject = new BehaviorSubject<IMenu | null>(null);
  private menuToDelete$ = this.menuToDeleteSubject.asObservable();

  constructor(
    private http: HttpClient,
    private dataManagementService: DataManagementService<IMenu>
  ) {}

  getData() {
    return this.http
      .get<IMenu[]>(this.apiUrl)
      .pipe(tap((data) => this.dataManagementService.updateData(data)));
  }

  postData(client: IMenu) {
    return this.http
      .post<IMenu>(this.apiUrl, client)
      .pipe(tap((newClient) => this.dataManagementService.addItem(newClient)));
  }

  setMenuToDelete(menu: IMenu) {
    this.menuToDeleteSubject.next(menu);
  }

  getMenuToDelete() {
    return this.menuToDelete$;
  }

  deleteData(menuId: number) {
    return this.http.delete<IMenu>(`${this.apiUrl}/${menuId}`).pipe(
      tap(() => {
        this.dataManagementService.removeItem((menu) => menu.id === menuId);
      })
    );
  }
}
