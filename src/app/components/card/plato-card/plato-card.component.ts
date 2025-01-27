import { Component, input, output } from '@angular/core';
import { AddButtonComponent } from '../../button/add-button/add-button.component';
import { ModifyButtonComponent } from '../../button/modify-button/modify-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plato-card',
  imports: [AddButtonComponent, ModifyButtonComponent, CommonModule],
  templateUrl: './plato-card.component.html',
  styleUrl: './plato-card.component.scss',
})
export class PlatoCardComponent {
  public buttonModifyClick = output();
  public buttonRemoveClick = output();

  public name = input<string>();
  public price = input<number>();
  public image = input<string>();

  onClickModifyButton() {
    this.buttonModifyClick.emit();
  }

  onClickRemoveButton() {
    this.buttonRemoveClick.emit();
  }
}
