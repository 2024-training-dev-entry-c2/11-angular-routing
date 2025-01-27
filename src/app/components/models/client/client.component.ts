import { Component } from '@angular/core';
import { GetAllClientService } from '../../../services/client/get-all-client.service';
import { IClient } from '../../../interfaces/client.interface';
import { ClientTableComponent } from './client-table/client-table.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-client',
  imports: [ClientTableComponent, RouterLink],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent{

}
