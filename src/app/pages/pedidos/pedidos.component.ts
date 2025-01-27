import { Component, inject } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { IPedido } from '../../interfaces/pedidos.interface';
import { PedidoCardComponent } from '../../components/card/pedido-card/pedido-card.component';
import { FormPedidosComponent } from "../../components/forms/form-pedidos/form-pedidos.component";

@Component({
  selector: 'app-pedidos',
  imports: [PedidoCardComponent, FormPedidosComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss',
})
export class PedidosComponent {
  private pedidoService = inject(PedidosService);
  public pedidoSelected: IPedido = {
    id: 0,
    idCliente: 0,
    precio: 0,
  };
  clients: any = [];

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.resetSelected();
    this.pedidoService.getAll().subscribe((res) => (this.clients = res));
  }

  addOrUpdate(pedido: IPedido) {
    if (
      this.pedidoSelected.precio == 0 &&
      this.pedidoSelected.idCliente == 0
    ) {
      this.add(pedido);
    } else {
      this.update(pedido);
    }
  }

  add(pedido: IPedido) {
    this.pedidoService.post(pedido).subscribe((_) => this.getAll());
  }

  update(pedido: IPedido) {
    this.pedidoService.update(pedido).subscribe((_) => this.getAll());
  }

  delete(id: number) {
    this.pedidoService.deleteById(id).subscribe((_) => this.getAll());
    console.log(id + ' delete menu');
  }

  selectToUpdate(client: IPedido) {
    this.pedidoSelected = client;
  }

  resetSelected(): void {
    this.pedidoSelected = {
      id: 0,
      idCliente: 0,
      precio: 0,
    };
  }
}
