import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IViewOrden } from '../inferfaces/view-orden.interface';
import {  Observable } from 'rxjs';
import { ICreateOrden } from '../inferfaces/create-orden.interface';
import { IEditOrden } from '../inferfaces/edit-orden.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {
  private http = inject(HttpClient);
  urlbase= 'http://localhost:8080/api/ordenes';

  execute(): Observable<IViewOrden[]> {
    return this.http.get<IViewOrden[]>(this.urlbase);
  }
  deleteOrderById(id: number): Observable<void> {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar esta orden?'
    );
    if (confirmed) {
      return this.http.delete<void>(`${this.urlbase}/${id}`);
    } else {
      return new Observable<void>();
    }
  }

  getOrdenById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlbase}/${id}`);
  }

  addOrden(payload: ICreateOrden): Observable<IViewOrden> {
    return this.http.post<IViewOrden>(this.urlbase, payload);
  }
  updateOrden(orden: ICreateOrden): Observable<IEditOrden> {
    console.log(orden)
    console.log(orden.id)
    return this.http.put<IEditOrden>(`${this.urlbase}/${orden.id}`, orden);
  }

  saveOrden(orden: ICreateOrden): Observable<IViewOrden | ICreateOrden > {
    if (orden.id) {
      return this.updateOrden(orden);
    } else {
      return this.addOrden(orden);
    }
  }
}
