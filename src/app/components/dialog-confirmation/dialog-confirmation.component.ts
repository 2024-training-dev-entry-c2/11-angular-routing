import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dialog-confirmation',
  imports: [],
  templateUrl: './dialog-confirmation.component.html',
  styleUrl: './dialog-confirmation.component.scss',
})
export class DialogConfirmationComponent {
  title = input<string>();
  text = input<string>();
  confirm = output<boolean>();

  onConfirm() {
    this.confirm.emit(true);
  }

  onCancel() {
    this.confirm.emit(false);
  }
}
