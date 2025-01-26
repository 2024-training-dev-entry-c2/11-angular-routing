import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { IResponseClients, ISendClient} from '../../interfaces/client.interface';
import { GetAllService } from '../../services/get-all.service';
import { tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IValidator } from '../../interfaces/validator.interface';
import { Environments } from '../../environments';
import { FormComponent } from "../../components/form/form.component";
import { CreateService } from '../../services/create.service';
import { IResponse } from '../../interfaces/response.interface';
import { DeleteService } from '../../services/delete.service';
import { UpdateService } from '../../services/update.service';
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
  selector: 'app-client',
  imports: [TableComponent, FormComponent, ModalComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {
  private createClient = inject(CreateService);
  private getClients = inject(GetAllService);
  private deleteClient = inject(DeleteService);
  private updateClient = inject(UpdateService);
  private formBuilder = inject(FormBuilder);

  public message: string = '';
  public title: string = '';
  public action: string = '';

  public url = Environments.API_URL + '/clients';
  
  public users: IResponseClients[] = [];
  public columns = [
    { field: 'name', header: 'Nombre' },
    { field: 'lastName', header: 'Apellido' },
    { field: 'email', header: 'Correo' },
    { field: 'clientType', header: 'Tipo de cliente' }
  ]

  public isModalOpen: boolean = false;

  openModal(event: boolean) {
    this.isModalOpen = event;
  }

  public form: FormGroup = this.formBuilder.group({
    id: [null],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  public controls: IValidator[] = [
    {text: 'Nombre', type: 'input', inputType: "text", controlName: 'name', placeholder: 'Juan'},
    {text: 'Apellido', type: 'input', inputType: "text", controlName: 'lastName', placeholder: 'Perez'},
    {text: 'Correo', type: 'input', inputType: "email", controlName: 'email', placeholder: 'juan@perez.com' },
  ];

  ngOnInit(): void {
    this.submit();
    this.getAllClients();
  }

  create() {
    this.action = 'Crear';
    this.title = 'Crear Cliente';

    if (this.form.valid) {
      this.createClient.execute<IResponse>(this.url, this.form.getRawValue() as unknown as ISendClient)
        .pipe(
          tap(result => {
            this.message = 'Cliente creado correctamente'; 
            this.getAllClients();

            setTimeout(() => {
              this.form.reset();
              this.message = '';
              this.isModalOpen = false;
            }, 1500);
          })
        ).subscribe(console.log);
    }
  }

  getAllClients(): void {
    this.getClients.execute<IResponseClients[]>(this.url)
    .pipe(
      tap(result => this.users = result)
    ).subscribe(console.log);
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
    this.isModalOpen = true;
  }

  update(clientId: number): void {
    if (this.form.valid) {
      this.updateClient.execute<IResponse>(this.url + "/" + clientId, this.form.getRawValue() as unknown as ISendClient)
      .pipe(
        tap(result => {
          this.message = 'Cliente actualizado correctamente'; 
          this.getAllClients();

          setTimeout(() => {
            this.form.reset();
            this.message = '';
            this.isModalOpen = false;
          }, 1500);
          })
        ).subscribe(console.log);
    }
  }

  submit(): void {
    if (this.form.value.id === null) {
      this.create();
    } else {
      this.update(this.form.value.id);
    }
  }

  deleteById(clientId: number): void {
    this.deleteClient.execute<IResponse>(this.url + "/" + clientId)
      .pipe(
        tap(result => this.getAllClients())
      ).subscribe();
  }
}
