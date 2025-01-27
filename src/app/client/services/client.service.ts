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

    save(Client: Partial<IClient>): Observable<string> {
      return this.http.post(
        this.url,
        Client,
        { responseType: 'text' } 
      ) as Observable<string>;
    }

    update(id: number, client: Partial<IClient>): Observable<IClient> {
      return this.http.put<IClient>(`${this.url}/${id}`,client);
    }

    delete(id: number): Observable<string> {
      return this.http.delete(
        `${this.url}/${id}`,
        { responseType: 'text' }
      ) as Observable<string>;
    }

    processClientData(
      id: number,
      onClientLoaded: (client: IClient) => void,
      onError?: (error: any) => void
    ): void {
      this.getById(id).subscribe({
        next: (client) => {
          onClientLoaded(client);
        },
        error: (err) => {
          console.error('Error al obtener cliente:', err);
          if (onError) onError(err);
        }
      });
    }


}
