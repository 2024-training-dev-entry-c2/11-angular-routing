import { Component, inject, OnInit } from '@angular/core';
import { TabsComponent } from '../../../components/tabs/tabs.component';
import { TableComponent } from '../../../components/table/table.component';
import { FormField } from '../../../interfaces/form.interface';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../components/form/form.component';
import { ClientService } from '../../../services/client/client.service';
import { Client, newClient } from '../../../interfaces/client.interface';
import { ClienteModalComponent } from '../cliente-modal/cliente-modal.component';

@Component({
  selector: 'app-clients',
  imports: [
    TabsComponent,
    TableComponent,
    InputComponent,
    ReactiveFormsModule,
    ClienteModalComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  ngOnInit(): void {
    this.getClients();
  }

  private formBuilder = inject(FormBuilder);
  listClients: any[] = [];
  clientData: Client | any;
  ClientId: number = 0;

  //tablist
  tabsList = [
    {
      title: 'Add client',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"',
    },
    {
      title: 'List',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-list"',
    },
  ];

  public fields: FormField[] = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      validators: [Validators.required, Validators.email],
      value: '',
      disable:false
    },
    {
      label: 'Name Client',
      type: 'text',
      name: 'name',
      validators: [Validators.required, Validators.minLength(8)],
      value: '',
      disable: false
    },
  ];

  public clients = inject(ClientService);
  ///addClient
  public clientForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    name: ['', [Validators.minLength(2), Validators.required]],
    isOften: false,
  });

  submit() {
    if (this.clientForm.valid) {
      this.clients
        .addClient(this.clientForm.getRawValue() as unknown as newClient)
        .subscribe({
          next: (data) => {
            this.getClients(); //update list?
            console.log(data);
            this.clientForm.reset({
              name: '',
              email: '',
            });

            alert('Client added successfully');
          },
          error: (error) => {
            console.log(error);
          },
        });
      console.log(this.clientForm.value);
    } else {
      console.log(this.clientForm);
    }
  }

  getClients() {
    this.clients.getClients().subscribe({
      next: (data) => {
        this.listClients = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteClient(id: number): void {
    console.log(id);
    this.clients.deleteClient(id).subscribe({
      next: (data) => {
        this.listClients = this.listClients.filter(
          (client) => client.id !== id
        );
        alert('Client deleted');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getClient(id: number): void {
    this.clients.getClientId(id).subscribe({
      next: (data) => {
        this.ClientId = id;
        this.clientData = data;
        this.showModal = true;
        this.getClients();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  showModal = false;
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
}
