import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreateCustomerService {
  private http = inject(HttpClient);

  execute(payload: any) {
    return this.http.post(environment.apiUrl + '/client', payload);
  }
}
