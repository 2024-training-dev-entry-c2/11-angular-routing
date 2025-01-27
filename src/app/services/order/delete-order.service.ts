import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from 'src/app/env';

@Injectable({
  providedIn: 'root',
})
export class DeleteOrderService {

  constructor(private http: HttpClient) {}

  execute(id: number): Observable<void> {
    return this.http.delete<void>(Env.API_URL + 'orders/'+ id);
  }
}