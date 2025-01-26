import { Component, inject } from '@angular/core';
import { GetClientComponent } from '../get-client/get-client.component';
import { AddClientComponent } from '../add-client/add-client.component';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../inferfaces/view-orden.interface';


@Component({
  selector: 'app-client',
  imports: [GetClientComponent, AddClientComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
   private clientService = inject(ClientService);
   clientEdit: IClient | null = null;

  editClient(id: number) {
    this.clientService.getClientById(id).subscribe((data: any) => {
      console.log('Datos recibidos del backend:', data);
      this.clientEdit = {
        ...data,
      };

      console.log('Orden para editar:', this.clientEdit);
    });
  }

}
