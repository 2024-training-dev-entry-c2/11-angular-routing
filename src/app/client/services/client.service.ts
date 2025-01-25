import { HttpClient} from '@angular/common/http';
import { inject,Injectable } from '@angular/core';
import { IClient } from '../interfaces/client.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClientService{
    private http = inject(HttpClient);

    private url = "http://localhost:8080/api/cliente";

    getAll(): Observable<IClient[]>{
        return this.http.get<IClient[]>(this.url);
    }

    getById(id: number): Observable<IClient> {
      return this.http.get<IClient>(`${this.url}/${id}`);
    }

    save(Client: Partial<IClient> ): Observable<IClient>{
      return this.http.post<IClient>(this.url,Client);
    }

    update(id: number, client: Partial<IClient>): Observable<IClient> {
      return this.http.put<IClient>(`${this.url}/${id}`,client);
    }

    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.url}/${id}`);
    }


}
