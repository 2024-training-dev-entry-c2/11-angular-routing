import { Component,inject,OnInit } from '@angular/core';
import { IClient } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-get-all',
  imports: [RouterLink],
  templateUrl: './get-all.component.html',
  styleUrl: './get-all.component.scss'
})
export class GetAllComponent implements OnInit{
  clients: IClient[] = [];

  private clienteService = inject(ClientService);

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.clienteService.getAll().subscribe({
      next: (lista) => {
        this.clients = lista;
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
      },
    });
  }
}
