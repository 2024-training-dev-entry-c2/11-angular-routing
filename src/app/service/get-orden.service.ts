import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IViewOrden } from '../inferfaces/view-orden.interface';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetOrdenService {

  private http = inject(HttpClient);

  execute(): Observable<IViewOrden[]> {
    return this.http.get<IViewOrden[]>('http://localhost:8080/api/ordenes')
  }

}
