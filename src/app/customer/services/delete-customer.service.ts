import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteCustomerService {
  private http = inject(HttpClient);

  execute(id: number): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + '/client/' + id);
  }
}
