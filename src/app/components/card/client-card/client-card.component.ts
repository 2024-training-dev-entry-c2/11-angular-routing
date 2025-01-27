import { Component, input, output } from '@angular/core';
import { AddButtonComponent } from "../../button/add-button/add-button.component";
import { ModifyButtonComponent } from "../../button/modify-button/modify-button.component";

@Component({
  selector: 'app-client-card',
  imports: [AddButtonComponent, ModifyButtonComponent],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss'
})
export class ClientCardComponent {
  public buttonModifyClick = output();
  public buttonRemoveClick = output();

  public name = input<string>();
  public email = input<string>();
  public tel = input<string>();

  onClickModifyButton() {
    this.buttonModifyClick.emit()
  }

  onClickRemoveButton() {
    this.buttonRemoveClick.emit()
  }

}
