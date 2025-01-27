import { Component, inject } from '@angular/core';
import { FormComponent } from '../../../template/main/form/form.component';
import { PostClientService } from '../../../../services/client/post-client.service';
import { IClientRequest } from '../../../../interfaces/client/client.request.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-client',
  imports: [FormComponent],
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.scss'
})
export class RegisterClientComponent {
  formContent={
    title: 'Agregar cliente',
    fields: [
      {key:'name',label:'Nombre', placeholder:'Ingresa el nombre del cliente', type:'text', errorMessage:'No ha ingresado el dato' },
      {key:'email',label:'Correo electrónico', placeholder:'Ingresa el correo del cliente', type:'email', errorMessage:'No ha ingresado el dato' }      
    ]
  };

  router = inject(Router);
  route = inject(ActivatedRoute);
  postClientService = inject(PostClientService);

  createClient(dishData: IClientRequest): void {
    this.postClientService.execute(dishData).subscribe(()=>{
      this.router.navigate(['../'], { relativeTo: this.route });
    } );
  }

  onSendForm(event: any){
    const clientRequest : IClientRequest = {name:'', email:''};
    clientRequest.name = event.name;
    clientRequest.email = event.email;
    this.createClient(clientRequest);
  }
}
