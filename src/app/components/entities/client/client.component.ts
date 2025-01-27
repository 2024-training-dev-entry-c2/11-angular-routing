import { Component, inject } from '@angular/core';
import { GetClientsService } from '../../../services/client/get-clients.service';
import { DeleteClientService } from '../../../services/client/delete-client.service';
import { IClientResponse } from '../../../interfaces/client/client.response.interface';
import { BoardComponent } from "../../template/main/board/board.component";
import { ContainerComponent } from "../../template/main/container/container.component";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { OptionsComponent } from "../../template/main/options/options.component";
import { BooleanPipe } from '../../../pipes/boolean.pipe';

@Component({
  selector: 'app-client',
  imports: [BoardComponent, ContainerComponent, RouterOutlet, OptionsComponent],
  providers:[TitleCasePipe, BooleanPipe],
  templateUrl: './client.component.html'
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

  titlePipe = inject(TitleCasePipe);
  booleanPipe = inject(BooleanPipe);

  ngOnInit(){
    this.getData();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd ))
      .subscribe(() => {
        this.getData();
    });
  }

  getData(): void{
    this.getClientsService.execute().subscribe((clients: IClientResponse[])=>{
      this.transformClientResponse(clients);
    })
  }

  private transformClientResponse(clients: IClientResponse[]): void {
    const titles = ['#', 'Nombre', 'Correo electrónico', '¿Es frecuente?'];
    const content = clients.map(client =>[
      client.id.toString(),
      this.titlePipe.transform(client.name),
      client.email,
      (this.booleanPipe.transform(client.frequent)).toString()
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
