import { Component, inject, ViewChild } from '@angular/core';
import { GetClientComponent } from '../../clients/get-client/get-client.component';
import { AddClientComponent } from '../../clients/add-client/add-client.component';
import { ClientService } from '../../../services/client.service';
import { IClient } from '../../../inferfaces/view-orden.interface';
import { ModalComponent } from "../../modal/modal.component";

@Component({
  selector: 'app-client',
  imports: [GetClientComponent, AddClientComponent, ModalComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent {
  private clientService = inject(ClientService);
  clients: IClient[] = [];
  clientEdit: IClient | null = null;
  isModalVisible: boolean = false;
  @ViewChild(GetClientComponent) getClientComponent!: GetClientComponent;

  ngOnInit() {
    this.loadClients();
  }
  addClient() {
    this.clientEdit = null;
    this.isModalVisible = true;
  }
  loadClients() {
    this.clientService.execute().subscribe({
      next: (data: IClient[]) => {
        this.clients = data.map(
          (client) =>
            ({
              ...client,
              clientId: this.clientEdit?.id || 0,
            } as unknown as IClient)
        );
      },
      error: (error) => {
        console.error('Error al cargar las órdenes', error);
      },
    });
  }

  editClient(id: number) {
    this.clientService.getClientById(id).subscribe((data: any) => {
      console.log('Datos recibidos del backend:', data);
      this.clientEdit = {
        ...data,
      };
      this.isModalVisible = true;
    });
  }
  onClientUpdated() {
    this.getClientComponent.loadClients();
    setTimeout(() => {
      this.isModalVisible = false;
    }, 2000);
  }
  closeModal() {
    this.isModalVisible = false;
  }
}
