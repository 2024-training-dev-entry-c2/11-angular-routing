import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormComponent } from "../form/form.component";

@Component({
  selector: 'app-modal',
  imports: [CommonModule, FormComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  public open = input<boolean>();
  public close = output<boolean>();

  private modal = document.querySelector('dialog') as HTMLDialogElement;

  public openModal() {
    if (this.open()) {
      this.modal.showModal();
    } else {
      this.modal.close();
    }
  }

  public closeModal() {
    this.close.emit(false);
  }
}
