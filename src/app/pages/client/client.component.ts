import { Component } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";

@Component({
  selector: 'app-client',
  imports: [TableComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  public url = 'http://localhost:8080/api/v1/clients';
}
