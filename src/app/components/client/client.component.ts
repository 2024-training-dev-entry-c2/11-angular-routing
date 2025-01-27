import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../interfaces/client.interface';
import { ClientModalComponent } from "../client-modal/client-modal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  imports: [ClientModalComponent, CommonModule],
})
export class ClientComponent implements OnInit {
  clients: IClient[] = [];
  selectedClient: IClient | null = null;
  isModalOpen: boolean = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  openModal(client: IClient | null): void {
    this.selectedClient = client;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedClient = null;
  }

  saveClient(client: IClient): void {
    if (client.id === 0) {
      this.clientService.createClient(client).subscribe((newClient) => {
        this.clients.push(newClient);
        this.closeModal();
      });
    } else {
      this.clientService.updateClient(client).subscribe((updatedClient) => {
        const index = this.clients.findIndex((c) => c.id === updatedClient.id);
        if (index !== -1) {
          this.clients[index] = updatedClient;
        }
        this.closeModal();
      });
    }
  }

  deleteClient(clientId: number): void {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clientService.deleteClient(clientId).subscribe(() => {
        this.clients = this.clients.filter((c) => c.id !== clientId);
      });
    }
  }
}
