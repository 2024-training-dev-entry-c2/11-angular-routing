import { Component, EventEmitter, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../header/header.component";
import { IClient } from '../../../interfaces/client.interface';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-header',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './client-header.component.html',
  styleUrl: './client-header.component.scss'
})
export class ClientHeaderComponent {
  clientName: string = '';
  email: string = '';
  phoneNumber: string = '';
  address: string = '';
  registrationDate: Date = new Date();;
  frequentUser: boolean = false;
  vip: boolean = false;

  @Output() clientAdded = new EventEmitter<IClient>();
  

constructor(
    private clientService: ClientService,
  ) {}

  addClientToAPI() {
    if (this.clientName.trim() && this.email.trim() && this.phoneNumber.trim() && this.address.trim()) {

      if (typeof this.registrationDate === 'string') {
        this.registrationDate = new Date(this.registrationDate);
      }
  
      if (!(this.registrationDate instanceof Date) || isNaN(this.registrationDate.getTime())) {
        console.error('registrationDate no es un objeto Date válido:', this.registrationDate);
        return;
      }
      const newClient = {
        idClient: null, 
        clientName: this.clientName.trim(),
        email: this.email.trim(),
        phoneNumber: this.phoneNumber.trim(),
        address: this.address.trim(),
        registrationDate: this.registrationDate, 
        frequentUser: this.frequentUser,
        vip: this.vip,
      };

      const clientToSend = {
        ...newClient,
        registrationDate: this.registrationDate.toISOString(), 
      };
  
      this.clientService.addClient(clientToSend).subscribe({
        next: response => {
          console.log('Cliente agregado exitosamente:', response);
          this.clientAdded.emit(response);
        },
        error: error => {
          console.error('Error al agregar el cliente:', error);
          console.error('Detalles del error:', error.error);
        }
      });
    } else {
      alert('Por favor, ingresa todos los campos requeridos para el cliente.');
    }
  }
  
}
