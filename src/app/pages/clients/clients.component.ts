import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClientService } from '../../core/services/client.service';
import { DatePipe } from '@angular/common';
import { Iclient } from '../../interfaces/client/client';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ModalUpdateComponent } from '../../shared/modal-update/modal-update.component';
import { IFormConfig } from '../../interfaces/client/fields';

@Component({
  selector: 'app-clients',
  imports: [MatIconModule, DatePipe, ModalComponent, ModalUpdateComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  public itemsTable: string[] = [
    'Nombre',
    'Email',
    'Teléfono',
    'Dirección',
    'Fecha de creación',
    'Acciones',
  ];

  public clientes: Iclient[] = [];
  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.clientes.subscribe((users) => (this.clientes = users));
    this.clientService.getClients();
  }

  deleteClient(id: number) {
    this.clientService.deleteClient(id).subscribe();
  }

  createClient(client: Iclient): void {
    this.clientService.createClient(client).subscribe();
  }

  editClient(id: number, client: Iclient): void {
    this.clientService.updateClient(id, client).subscribe();
  }

  public editarClient: IFormConfig = {
    title: 'Editar cliente',
    action: 'editar',
    service: 'clientes',

    fields: [
      {
        name: 'name',
        type: 'text',
        placeholder: 'Nombre',
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Correo electrónico',
      },
      {
        name: 'phone',
        type: 'number',
        placeholder: 'Telefono',
      },
      {
        name: 'address',
        type: 'string',
        placeholder: 'Dirección',
      },
    ],
    submitText: 'Editar',
  };

  public crearClient: IFormConfig = {
    title: 'Crear cliente',
    action: 'crear',
    service: 'clientes',
    fields: [
      {
        name: 'name',
        type: 'text',
        placeholder: 'Nombre',
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Correo electrónico',
      },
      {
        name: 'phone',
        type: 'number',
        placeholder: 'Telefono',
      },
      {
        name: 'address',
        type: 'string',
        placeholder: 'Dirección',
      },
    ],
    submitText: 'Crear',
  };
}
