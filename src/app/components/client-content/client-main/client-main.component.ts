import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IClient } from '../../../interfaces/client.interface';
import { ClientService } from '../../../services/client.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-client-main',
  imports: [CommonModule, FormsModule],
  templateUrl: './client-main.component.html',
  styleUrls: ['./client-main.component.scss'],
})
export class ClientMainComponent implements OnInit {
  clients: IClient[] = []; 
  filteredClients: IClient[] = []; 
  modalType: string = '';
  clientName: string = '';
  email: string = '';
  phoneNumber: string = '';
  address: string = '';
  registrationDate: Date = new Date;
  frequentUser: boolean = false;
  vip: boolean = false;
  currentClientName: string = '';
  selectedClientId: number | null = null;

  @Input() searchQuery: string = '';

  constructor(
    private clientService: ClientService, 
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  ngOnChanges(): void {
    this.filterClients();
  }

  getHeaders() {
    return [
      { label: 'Cliente ID' },
      { label: 'Nombre del Cliente' },
      { label: 'Correo' },
      { label: 'Teléfono' },
      { label: 'Dirección' },
      { label: 'Fecha de Registro' },
      { label: 'Usuario Frecuente' },
      { label: 'VIP' },
      { label: 'Acciones' },
    ];
  }

  getActions() {
    return [
      {
        label: 'Editar',
        type: 'edit',
        icon: 'svg/edit.svg#edit',
      },
      {
        label: 'Eliminar',
        type: 'delete',
        icon: 'svg/delete.svg#delete',
      },
    ];
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      (clients) => {
        this.clients = clients;
        this.filteredClients = [...clients];
      },
      (error) => {
        console.error('Error loading clients', error);
      }
    );
  }

    addClient(newClient: IClient): void {
      this.clients.push(newClient);
      this.filterClients(); 
    }

  filterClients(): void {
    if (this.searchQuery) {
      this.filteredClients = this.clients.filter(client => 
        client.clientName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredClients = [...this.clients]; 
    }
  }

  openModal(modalTemplate: TemplateRef<any>, type: string, id: number): void {
    this.modalType = type;
    this.selectedClientId = id;

    if (type === 'edit') {
      this.loadClientDetails(id);
    }

    this.modalService
      .open(modalTemplate, this.viewContainerRef, {
        title: type === 'edit' ? 'Editar Cliente' : 'Eliminar Cliente',
        buttonName: 'Confirmar',
      })
      .subscribe(() => {
        if (type === 'edit' && this.selectedClientId) {
          const updatedClient: IClient = { 
            idClient: this.selectedClientId, 
            clientName: this.clientName, 
            email: this.email,
            phoneNumber: this.phoneNumber,
            address: this.address,
            registrationDate: this.registrationDate,
            frequentUser: this.frequentUser,
            vip: this.vip,
          };
          this.updateClient(this.selectedClientId, updatedClient);
        } else if (type === 'delete' && this.selectedClientId) {
          this.deleteClient(this.selectedClientId);
        }
      });
  }

  deleteClient(id: number): void {
      this.clientService.deleteClient(id).subscribe(
        () => {
          console.log('Client deleted');
          this.loadClients();
        },
        (error) => {
          console.error('Error deleting client', error);
        }
      );
    }
  
    updateClient(id: number, updatedClient: IClient): void {
      this.clientService.updateClient(id, updatedClient).subscribe(
        () => {
          console.log('Client updated');
          this.loadClients();
        },
        (error) => {
          console.error('Error updating client', error);
        }
      );
    }

  loadClientDetails(id: number): void {
    this.clientService.getClientById(id).subscribe(
      (client) => { 
        this.clientName = client.clientName;
        this.email = client.email;
        this.phoneNumber = client.phoneNumber;
        this.address = client.address;
        this.registrationDate = client.registrationDate;
        this.frequentUser = client.frequentUser;
        this.vip = client.vip;
      },
      (error) => {
        console.error('Error loading client details', error);
      }
    );
  }
}
