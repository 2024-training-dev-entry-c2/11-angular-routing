import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClientService } from '../../core/services/client.service';

@Component({
  selector: 'app-clients',
  imports: [MatIconModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {

  public clientes:any[] = [];
  constructor(private clientService: ClientService) { }
  ngOnInit(): void {
    console.log("Funciono");

    this.clientService.getClients().subscribe(user => this.clientes = user);
  }



}
