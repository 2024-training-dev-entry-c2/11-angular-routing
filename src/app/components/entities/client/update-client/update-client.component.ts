import { Component, inject } from '@angular/core';
import { FormComponent } from '../../../template/main/form/form.component';
import { IClientRequest } from '../../../../interfaces/client/client.request.interface';
import { PutClientService } from '../../../../services/client/put-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetClientService } from '../../../../services/client/get-client.service';
import { IClientResponse } from '../../../../interfaces/client/client.response.interface';

@Component({
  selector: 'app-update-client',
  imports: [FormComponent],
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.scss'
})
export class UpdateClientComponent {
  formContent = {
    title: 'Actualizar cliente',
    fields: [
      {key:'name',label:'Nombre', placeholder:'Ingresa el nombre del cliente', type:'text', errorMessage:'No ha ingresado el dato' },
      {key:'email',label:'Correo electrónico', placeholder:'Ingresa el correo del cliente', type:'email', errorMessage:'No ha ingresado el dato' }      
    ]
  };

  id: string | null = null;

  initialData: {key:keyof IClientResponse, content:string}[] = [
    {key:'name', content: ''},
    {key:'email', content: ''},
  ];

  getClientService = inject(GetClientService);
  putClientService = inject(PutClientService);

  
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.getClientService.execute(this.id!).subscribe((response)=>{
      this.initialData.forEach(dataField => {
        if (response[dataField.key] !== undefined) {
          dataField.content = response[dataField.key].toString() ?? '';
        }
      });
    })
  }

  updateClient(id:string, clientData: IClientRequest): void{
    this.putClientService.execute(id,clientData).subscribe(()=>{
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
    );
  }

  onSendForm(event: any){
    const clientRequest : IClientRequest = {name:'', email:''};
    clientRequest.name = event.name;
    clientRequest.email = event.email;
    this.updateClient(this.id!, clientRequest);
  }
}
