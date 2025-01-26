import { Component,inject } from '@angular/core';
import { IClient } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { NotificationService } from '../../../notification/services/notification.service';


@Component({
  selector: 'app-get-by-id',
  imports: [ReactiveFormsModule],
  templateUrl: './get-by-id.component.html',
  styleUrl: './get-by-id.component.scss'
})
export class GetByIdComponent {
  private formBuilder = inject(FormBuilder);
  private clientService = inject(ClientService);
  private notificationService = inject(NotificationService);

  public id: number = 0;
  public client: IClient = {id:0, nombre:'', cedula:'', correo:'', telefono:''}

  public form = this.formBuilder.group({
    id: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]]
  });

  public loadClientData(id: number): void {
    this.clientService.processClientData(
      id,
      (client) => {
        this.client = client;
      },
      (error) => {
        this.notificationService.setNotification('error', 'No se encontro un cliente con esa ID');;
      }
    );
  }

  onSubmit(){
    if (this.form.invalid) {
      console.log("formulario invalido");
      console.log(this.form.value);
      return;
    }

    this.id = +this.form.get('id')!.value!;
    this.loadClientData(this.id);
  }

}
