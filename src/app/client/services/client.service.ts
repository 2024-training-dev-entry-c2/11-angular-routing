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

    save(IClient: Partial<IClient> ): Observable<IClient>{
      return this.http.post<IClient>(this.url,IClient);
    }

}
