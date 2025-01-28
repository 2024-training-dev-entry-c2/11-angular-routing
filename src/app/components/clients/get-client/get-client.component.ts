import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { IClient } from '../../../inferfaces/view-orden.interface';
import { BottonDeleteComponent } from '../../bottons/botton-delete/botton-delete.component';
import { BottonEditComponent } from '../../bottons/botton-edit/botton-edit.component';
import { BottonAddComponent } from "../../bottons/botton-add/botton-add.component";

@Component({
  selector: 'app-get-client',
  imports: [BottonDeleteComponent, BottonEditComponent, BottonAddComponent],
  templateUrl: './get-client.component.html',
  styleUrl: './get-client.component.scss',
})
export class GetClientComponent {
  private clienteService = inject(ClientService);
  clients: IClient[] = [];
  @Output() editClientEvent = new EventEmitter<number>();

   ngOnInit() {
      this.loadClients();
    }

    loadClients() {
      this.clienteService.execute().subscribe({
        next: (data: IClient[]) => {
          this.clients = data;
        },
        error: (error: any) => {
          console.error('Error al obtener la orden', error);
        },
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
      },
    });
  }
}
