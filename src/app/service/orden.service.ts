import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IViewOrden } from '../inferfaces/view-orden.interface';
import {  Observable } from 'rxjs';
import { ICreateOrden } from '../inferfaces/create-orden.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {
  private http = inject(HttpClient);

  execute(): Observable<IViewOrden[]> {
    return this.http.get<IViewOrden[]>('http://localhost:8080/api/ordenes');
  }
  deleteOrderById(id: number): Observable<void> {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar esta orden?'
    );
    if (confirmed) {
      return this.http.delete<void>(`http://localhost:8080/api/ordenes/${id}`);
    } else {
      return new Observable<void>();
    }
  }

  addOrden(payload: ICreateOrden): Observable<IViewOrden> {
    return this.http.post<IViewOrden>('http://localhost:8080/api/ordenes', payload);
  }
}
