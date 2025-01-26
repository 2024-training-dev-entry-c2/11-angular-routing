import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../inferfaces/view-orden.interface';
import { BottonDeleteComponent } from '../botton-delete/botton-delete.component';
import { BottonEditComponent } from "../botton-edit/botton-edit.component";

@Component({
  selector: 'app-get-client',
  imports: [BottonDeleteComponent, BottonEditComponent],
  templateUrl: './get-client.component.html',
  styleUrl: './get-client.component.scss'
})
export class GetClientComponent {
 private clienteService = inject(ClientService);
 clients: IClient[] = [];
 @Output() editClientEvent = new EventEmitter<number>();

ngOnInit() {
    this.clienteService.execute().subscribe({
      next: (data: IClient[]) => {
        this.clients = data;
      },
      error: (error) => {
        console.error('Error al obtener la orden', error);
      }
    });
  }
  editClient(id: number) {
    this.editClientEvent.emit(id);
  }
  deleteClient(id: number): void {
    this.clienteService.deleteClientById(id).subscribe({
      next: () => {
        this.clients = this.clients.filter((client) => client.id !== id);
      },
      error: (error: any) => {
        console.error('Error al eliminar la orden:', error);
      }
    });
  }
}
