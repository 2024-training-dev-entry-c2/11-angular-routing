import { Component, input, output } from '@angular/core';
import { AddButtonComponent } from "../../button/add-button/add-button.component";
import { ModifyButtonComponent } from "../../button/modify-button/modify-button.component";

@Component({
  selector: 'app-pedido-card',
  imports: [AddButtonComponent, ModifyButtonComponent],
  templateUrl: './pedido-card.component.html',
  styleUrl: './pedido-card.component.scss',
})
export class PedidoCardComponent {
  public buttonModifyClick = output();
  public buttonRemoveClick = output();

  public precio = input<string>();
  public idCliente = input<string>();

  onClickModifyButton() {
    this.buttonModifyClick.emit();
  }

  onClickRemoveButton() {
    this.buttonRemoveClick.emit();
  }
}
