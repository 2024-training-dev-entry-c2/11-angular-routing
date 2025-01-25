import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeleteCustomerService {
  private http = inject(HttpClient);

  execute(id: number) {
    return this.http.delete(environment.apiUrl + '/client/' + id);
  }
}
