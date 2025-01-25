import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListCustomersService {
  private http = inject(HttpClient);

  execute() {
    return this.http.get(environment.apiUrl + '/client');
  }
}
