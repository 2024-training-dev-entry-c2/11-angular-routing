import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UpdateCustomerService {
  private http = inject(HttpClient);

  execute(id: number, payload: any) {
    return this.http.put(environment.apiUrl + '/client/' + id, payload);
  }
}
