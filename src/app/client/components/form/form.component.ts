import { Component,inject, Input,} from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private formBuilder = inject(FormBuilder);
  private clientService = inject(ClientService);

  @Input() title: String = '';
  @Input() action: String = '';
  @Input() idCliente ?: number;
  
  public form = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    cedula: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]],
    correo: ['', [Validators.required,Validators.email]],
    telefono: ['', [Validators.pattern(/^[0-9]+$/)]]
  });

  onSubmit(){
    if(this.form.invalid){
      console.log("formulario invalido");
      console.log(this.form.value);
      return;
    }
    const client: IClient = this.form.value as IClient;

    if(this.action=="save"){
      this.saveClient(client);
    }else if(this.action=="update" && this.idCliente){
      this.updateClient(this.idCliente,client);
    }
  }

  saveClient(client: IClient){
    this.clientService.save(client).subscribe({
      next: (created) => {
        console.log('Cliente creado', created);
      },
      error: (err) => console.error('Error al crear cliente', err),
    })
  }

  updateClient(idCliente: number,client: IClient){
    this.clientService.update(idCliente, client).subscribe({
      next: (updated) => {
        console.log('Cliente actualizado', updated);
      },
      error: (err) => console.error('Error al actualizar cliente', err),
    });
  }


}
