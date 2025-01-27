import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPlato } from '../interfaces/plato.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatosService {
  private http = inject(HttpClient);
  private urlBase = 'http://localhost:8080/api';

  post(plato: IPlato) {
    console.log(plato);
    return this.http.post<IPlato>(`${this.urlBase}/platos`, {
      nombre: plato.nombre,
      idMenu: plato.idmenu,
      precio: plato.precio,
      urlImage: plato.urlImage,
    });
  }

  update(plato: IPlato) {
    console.log(plato);
    return this.http.put<IPlato>(
      `${this.urlBase}/platos/${plato.id}`,
      {
        nombre: plato.nombre,
        precio: plato.precio,
        urlImage: plato.urlImage,
        tipoPlato: plato.tipoPlato,
      },
      {
        headers: this.getHeaders(),
        responseType: 'text' as 'json',
      }
    );
  }

  getAll(): Observable<IPlato> {
    return this.http.get<IPlato>(`${this.urlBase}/platos`, {
      headers: this.getHeaders(),
    });
  }

  deleteById(id: number) {
    return this.http.delete(`${this.urlBase}/platos/${id}`);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
