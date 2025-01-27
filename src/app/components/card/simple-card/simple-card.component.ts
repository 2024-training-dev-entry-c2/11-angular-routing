import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddButtonComponent } from '../../button/add-button/add-button.component';
import { ModifyButtonComponent } from '../../button/modify-button/modify-button.component';

@Component({
  selector: 'app-simple-card',
  imports: [
    RouterLink,
    CommonModule,
    AddButtonComponent,
    ModifyButtonComponent,
  ],
  templateUrl: './simple-card.component.html',
  styleUrl: './simple-card.component.scss',
})
export class SimpleCardComponent {
  public buttonModifyClick = output();
  public buttonRemoveClick = output();

  public title = input<string>();
  public image = input<string>();
  public link = input<string>();

  onClickModifyButton() {
    this.buttonModifyClick.emit()
  }

  onClickRemoveButton() {
    this.buttonRemoveClick.emit()
  }

  getImage() {
    return this.image;
  }

  getLink() {
    return this.link;
  }
}
