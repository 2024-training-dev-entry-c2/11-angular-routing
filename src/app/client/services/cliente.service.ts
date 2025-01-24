import { HttpClient} from '@angular/common/http';
import { inject,Injectable } from '@angular/core';
import { ICliente } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClienteService{
    private http = inject(HttpClient);

    private url = "http://localhost:8080/api/cliente";

    obtenerTodos(): Observable<ICliente[]>{
        return this.http.get<ICliente[]>(this.url);
    }

}
