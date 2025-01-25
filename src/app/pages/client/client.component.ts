import { Component, inject } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { IResponseClients} from '../../interfaces/client.interface';
import { GetAllService } from '../../services/get-all.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-client',
  imports: [TableComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  private getClients = inject(GetAllService);

  public url = 'http://localhost:8080/api/v1/clients';

  public title = 'Clientes';
  public users: IResponseClients[] = [];
  public columns = [
    { field: 'name', header: 'Nombre' },
    { field: 'lastName', header: 'Apellido' },
    { field: 'email', header: 'Correo' },
    { field: 'clientType', header: 'Tipo de cliente' }
  ]

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients(): void {
    this.getClients.execute<IResponseClients[]>(this.url)
    .pipe(
      tap(result => this.users = result)
    ).subscribe(console.log);
  }

  updateById(id: number): void {
    console.log('Update:', id);
  }

  deleteById(id: number): void {
    console.log('Delete:', id);
  }
}
