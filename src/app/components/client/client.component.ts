import { Component, inject, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { FormComponent } from "../form/form.component";
import { CreateService } from '../../services/client/create.service';
import { GetClientsService } from '../../services/client/get-clients.service';
import { DeleteService } from '../../services/client/delete.service';
import { UpdateService } from '../../services/client/update.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClient, IClients } from '../../interfaces/client.interface';
import { tap } from 'rxjs';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-client',
  imports: [FormComponent, TableComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {
  private createClient = inject(CreateService);
  private getClients = inject(GetClientsService);
  private deleteClient = inject(DeleteService);
  private updateClient = inject(UpdateService);
  private formBuilder = inject(FormBuilder);

  public message: string = '';
  public action: string = '';
  public title: string = '';

  public users: IClients[] = [];
  public columns = [
    {field: 'name', header: 'Nombre'},
    {field: 'lastName', header: 'Apellido'},
    {field: 'email', header: 'Correo'},
    {field: 'userType', header: 'Tipo de Usuario'}
  ];

  public isOpen: boolean = false;

  openModal(event: boolean) {
    this.isOpen = event;
  }

  public form: FormGroup = this.formBuilder.group({
    id: [null],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  
  ngOnInit(): void {
    this.submit();
    this.getClientsTable();
  }

  create(): void {
    this.action = 'Crear';
    this.title = 'Crear Cliente';

    if (this.form.valid) {
      this.createClient.execute(this.form.getRawValue() as unknown as IClient)
        .pipe(
          tap(result => {
            this.message = result.message;
            this.getClientsTable();
            this.action = 'Crear';
            this.title = 'Crear Cliente';
          })
        ).subscribe(console.log);
    }
  }

  getClientsTable(): void {
    this.getClients.execute()
      .pipe(
        tap(result => this.users = result)
      ).subscribe();
  }

  deleteClientById(clientId: number): void {
    this.deleteClient.execute(clientId)
      .pipe(
        tap(result => this.getClientsTable())
      ).subscribe();
  }

  updateById(clientId: number): void {
    this.message = '';
    this.action = 'Actualizar';
    this.title = 'Actualizar Cliente';
    const client = this.users.find(user => user.id === clientId);

    this.form.patchValue({
      id: clientId,
      name: client?.name,
      lastName: client?.lastName,
      email: client?.email
    });
  }

  update(clientId: number): void {

    if (this.form.valid) {
      this.updateClient.execute(clientId, this.form.getRawValue() as unknown as IClient)
        .pipe(
          tap(result => {
            this.message = result.message;
            this.getClientsTable();
            this.action = 'Actualizar';
            this.title = 'Actualizar Cliente';
          })
        ).subscribe(console.log);
    }
  }

  submit(): void {
    console.log(this.form.value.id);
    if (this.form.value.id === null) {
      this.create();
    }
    else {
      this.update(this.form.value.id);
    }
  }
}
