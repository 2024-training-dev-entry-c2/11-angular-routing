import { Component,inject,OnInit } from '@angular/core';
import { ICliente } from '../../interfaces/cliente.interface';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-get-all',
  imports: [],
  templateUrl: './get-all.component.html',
  styleUrl: './get-all.component.scss'
})
export class GetAllComponent {
  clientes: ICliente[] = [];

  private clienteService = inject(ClienteService);

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.obtenerTodos().subscribe({
      next: (lista) => {
        this.clientes = lista;
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
      },
    });
  }
}
