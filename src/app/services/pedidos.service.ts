import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPedido } from '../interfaces/pedidos.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private http = inject(HttpClient);
  private urlBase = 'http://localhost:8080/api';

  post(pedido: IPedido) {
    return this.http.post<IPedido>(`${this.urlBase}/pedido`, {
      precio: pedido.precio,
      idCliente: pedido.idCliente,
    });
  }

  update(pedido: IPedido) {
    console.log(pedido);
    return this.http.put<IPedido>(
      `${this.urlBase}/pedido/${pedido.id}`,
      {
        precio: pedido.precio,
      },
      {
        headers: this.getHeaders(),
        responseType: 'text' as 'json',
      }
    );
  }

  getAll(): Observable<IPedido> {
    return this.http.get<IPedido>(`${this.urlBase}/pedido`, {
      headers: this.getHeaders(),
    });
  }

  deleteById(id: number) {
    return this.http.delete(`${this.urlBase}/pedido/${id}`);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
