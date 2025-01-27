import { Component, inject } from '@angular/core';
import { GetClientsService } from '../../../services/client/get-clients.service';
import { DeleteClientService } from '../../../services/client/delete-client.service';
import { IClientResponse } from '../../../interfaces/client/client.response.interface';
import { BoardComponent } from "../../template/main/board/board.component";
import { ContainerComponent } from "../../template/main/container/container.component";
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-client',
  imports: [BoardComponent, ContainerComponent, RouterOutlet, RouterLink],
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

  getClientsService = inject(GetClientsService);
  deleteClientService = inject(DeleteClientService);

  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(){
    this.getData();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd ))
      .subscribe(async() => {
        await this.getData();
    });
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

  deleteClient(id:string): void {
    this.deleteClientService.execute(id).subscribe(()=>{
      this.getData();
    }     
    );
  }

}
