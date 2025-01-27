import { Component, inject, ViewChild } from '@angular/core';
import { GetClientComponent } from '../../clients/get-client/get-client.component';
import { AddClientComponent } from '../../clients/add-client/add-client.component';
import { ClientService } from '../../../services/client.service';
import { IClient } from '../../../inferfaces/view-orden.interface';


@Component({
  selector: 'app-client',
  imports: [GetClientComponent, AddClientComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
   private clientService = inject(ClientService);
   clients: IClient[] = [];
   clientEdit: IClient | null = null;
   @ViewChild(GetClientComponent) getClientComponent!: GetClientComponent;

   ngOnInit() {
       this.loadClients();
     }

     loadClients() {
       this.clientService.execute().subscribe({
         next: (data: IClient[]) => {
           this.clients = data.map(client => ({
             ...client,
             clientId: this.clientEdit?.id || 0,
           } as unknown as IClient));
         },
         error: (error) => {
           console.error('Error al cargar las órdenes', error);
         }
       });
     }

  editClient(id: number) {
    this.clientService.getClientById(id).subscribe((data: any) => {
      console.log('Datos recibidos del backend:', data);
      this.clientEdit = {
        ...data,
      };

      console.log('Orden para editar:', this.clientEdit);
    });
  }
  onClientUpdated() {

    this.getClientComponent.loadClients();
  }
}
