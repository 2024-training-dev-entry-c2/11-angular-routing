import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClients } from '../interface/clients.interface';
import { tap } from 'rxjs';
import { DataManagementService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class getClientsService {
  private apiUrl = 'http://localhost:8080/api/clients';
  
  constructor(
    private http: HttpClient,
    private dataManagementService: DataManagementService<IClients>
  ) {}

  getData() {
    return this.http.get<IClients[]>(this.apiUrl).pipe(
      tap(data => this.dataManagementService.updateData(data))
    );
  }
    
  postData(client: IClients) {
    return this.http.post<IClients>(this.apiUrl, client).pipe(
      tap(newClient => this.dataManagementService.addItem(newClient))
    );
  }

}
