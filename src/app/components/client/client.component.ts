import { Component } from '@angular/core';
import { GetClientComponent } from '../get-client/get-client.component';
import { AddClientComponent } from '../add-client/add-client.component';


@Component({
  selector: 'app-client',
  imports: [GetClientComponent, AddClientComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

}
