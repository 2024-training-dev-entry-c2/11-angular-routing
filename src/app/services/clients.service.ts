import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClients } from '../interface/clients.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { DataManagementService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class getClientsService {
  private apiUrl = 'http://localhost:8080/api/clients';
  private clientToDeleteSubject = new BehaviorSubject<IClients | null>(null);
  private clientToDelete$ = this.clientToDeleteSubject.asObservable();
  private clientToEditSubject = new BehaviorSubject<IClients | null>(null);
  private clientToEdit$ = this.clientToEditSubject.asObservable();

  constructor(
    private http: HttpClient,
    private dataManagementService: DataManagementService<IClients>
  ) {}

  getData() {
    return this.http.get<IClients[]>(this.apiUrl).pipe(
      tap((clients) => {
        this.dataManagementService.updateData(clients);
      })
    );
  }

  postData(client: IClients) {
    return this.http
      .post<IClients>(this.apiUrl, client)
      .pipe(tap((newClient) => this.dataManagementService.addItem(newClient)));
  }

  setClientToDelete(client: IClients) {
    this.clientToDeleteSubject.next(client);
  }

  getClientToDelete() {
    return this.clientToDelete$;
  }

  setClientToEdit(client: IClients) {
    this.clientToEditSubject.next(client);
  }

  getClientToEdit() {
    return this.clientToEdit$;
  }

  deleteData(clientId: number) {
    return this.http.delete<IClients>(`${this.apiUrl}/${clientId}`).pipe(
      tap(() => {
        this.dataManagementService.removeItem(
          (client) => client.id === clientId
        );
      })
    );
  }

  editData(id: number, clientData: IClients) {
    return this.http.put<IClients>(`${this.apiUrl}/${id}`, clientData).pipe(
      tap((updatedClient) => {
        this.getData().subscribe();
        console.log(updatedClient);
      })
    );
  }
}
