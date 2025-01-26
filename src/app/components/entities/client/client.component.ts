import { Component, inject } from '@angular/core';
import { GetClientsService } from '../../../services/client/get-clients.service';
import { PostClientService } from '../../../services/client/post-client.service';
import { PutClientService } from '../../../services/client/put-client.service';
import { DeleteClientService } from '../../../services/client/delete-client.service';
import { IClientResponse } from '../../../interfaces/client/client.response.interface';
import { IClientRequest } from '../../../interfaces/client/client.request.interface';
import { FormComponent } from '../../template/main/form/form.component';
import { BoardComponent } from "../../template/main/board/board.component";
import { ContainerComponent } from "../../template/main/container/container.component";

@Component({
  selector: 'app-client',
  imports: [FormComponent, BoardComponent, ContainerComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  formContent={
    title: 'Registrar cliente',
    fields: [
      {key:'name',label:'Nombre', placeholder:'Ingresa el nombre del cliente', type:'text', errorMessage:'No ha ingresado el dato' },
      {key:'email',label:'Correo electrónico', placeholder:'Ingresa el correo del cliente', type:'email', errorMessage:'No ha ingresado el dato' }      
    ]
  };

  
  tableContent:{ titles: string[]; content: string[][];} = { titles: [], content: [] };
  idToUpdate: string | null = null;

  getClientsService = inject(GetClientsService);
  postClientService = inject(PostClientService);
  putClientService = inject(PutClientService);
  deleteClientService = inject(DeleteClientService);
  isVisibleForm: boolean = false; 

  ngOnInit(){
    this.getData();
  }

  getData(): void{
    this.getClientsService.execute().subscribe((clients: IClientResponse[])=>{
      this.transformClientResponse(clients);
    })
  }

  private transformClientResponse(dishes: IClientResponse[]): void {
    const titles = ['#', 'Nombre', 'Correo electrónico', '¿Es frecuente?'];
    const content = dishes.map(dish =>[
      dish.id.toString(),
      dish.name,
      dish.email,
      dish.frequent.toString()
    ]);

    this.tableContent={titles, content};
  }

  createClient(dishData: IClientRequest): void {
    this.postClientService.execute(dishData).subscribe(
      () => {
        this.getData();
      }
    );
  }

  updateClient(id:string, dishData: IClientRequest): void{
    this.putClientService.execute(id,dishData).subscribe(
      () => {
        this.getData();
      }
    );
  }

  deleteClient(id:string): void {
    this.deleteClientService.execute(id).subscribe(()=>{
      this.getData();
    }     
    );
  }

  onUpdateClick(event:string){
    this.idToUpdate = event;
  }


  onSendForm(event: any){
    const clientRequest : IClientRequest = {name:'', email:''};
    clientRequest.name = event.name;
    clientRequest.email = event.email;
    console.log(clientRequest);
    this.createClient(clientRequest);
  }

  onSendUpdatedForm(event: any){
    const clientRequest : IClientRequest = {name:'', email:''};
    clientRequest.name = event.name;
    clientRequest.email = event.email;
    this.updateClient(event.idItem, clientRequest);
  }
}
