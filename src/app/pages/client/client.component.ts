import { Component, inject } from '@angular/core';
import { SimpleCardComponent } from '../../components/card/simple-card/simple-card.component';
import { FormMenuComponent } from '../../components/forms/form-menu/form-menu.component';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../interfaces/client.interface';
import { FormClientComponent } from "../../components/forms/form-client/form-client.component";
import { ClientCardComponent } from "../../components/card/client-card/client-card.component";

@Component({
  selector: 'app-client',
  imports: [FormClientComponent, ClientCardComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent {
  private clienteService = inject(ClientService);
  public clientSelected: IClient = {
    id: null,
    nombre: '',
    email: '',
    telefono: '',
    tipoCliente: '',
  };
  clients: any = [];

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.resetSelected();
    this.clienteService.getAll().subscribe((res) => (this.clients = res));
  }

  addOrUpdate(client: IClient) {
    if (
      this.clientSelected.nombre == '' &&
      this.clientSelected.email == '' &&
      this.clientSelected.telefono == '' &&
      this.clientSelected.tipoCliente == ''
    ) {
      this.add(client);
    } else {
      this.update(client);
    }
  }

  add(client: IClient) {
    this.clienteService.post(client).subscribe((_) => this.getAll());
  }

  update(client: IClient) {
    this.clienteService.update(client).subscribe((_) => this.getAll());
  }

  delete(id: number) {
    this.clienteService.deleteById(id).subscribe((_) => this.getAll());
    console.log(id + ' delete menu');
  }

  selectToUpdate(client: IClient) {
    this.clientSelected = client;
  }

  resetSelected(): void {
    this.clientSelected = {
      id: null,
      nombre: '',
      email: '',
      telefono: '',
      tipoCliente: '',
    };
  }
}
