import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from 'src/app/env';

@Injectable({
  providedIn: 'root',
})
export class DeleteDishService {
  constructor(private http: HttpClient) {}

  deleteDish(id: number): Observable<void> {
    return this.http.delete<void>(Env.API_URL + 'dish/' + id);
  }
}