import { Component } from '@angular/core';
import { GetClientComponent } from '../get-client/get-client.component';


@Component({
  selector: 'app-client',
  imports: [GetClientComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

}
