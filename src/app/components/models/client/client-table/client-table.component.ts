import { Component, inject,  OnInit} from '@angular/core';
import { IClient } from '../../../../interfaces/client.interface';
import { DeleteClientService } from '../../../../services/client/delete-client.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetAllClientService } from '../../../../services/client/get-all-client.service';

@Component({
  selector: 'app-client-table',
  imports: [CommonModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss',
})
export class ClientTableComponent implements OnInit {
  protected clients!: Observable<IClient[]>;
  private clientsSubject = new BehaviorSubject<IClient[]>([]);
  private deleteClientService =  inject(DeleteClientService);
  private getAllClientService = inject(GetAllClientService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.clients = this.clientsSubject.asObservable();
    this.loadClients();
  }

  loadClients() {
    this.getAllClientService.execute().subscribe((data) => {
      this.clientsSubject.next(data);
    });
  }

  deleteClient(clientId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')){
      this.deleteClientService.execute(clientId).subscribe({
        next: () => {
          const updatedClients = this.clientsSubject.getValue().filter(client => client.id !== clientId);
          this.clientsSubject.next(updatedClients);
        },
        error: (e) => {
          console.error('Error al eliminar el cliente:', e);
        }
      });
    }
  }

  goToEditClient(clientId: number): void {
    this.router.navigate([`/edit-client/${clientId}`]);
  }

}
