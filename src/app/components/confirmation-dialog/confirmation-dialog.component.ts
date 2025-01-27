import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { inject } from '@angular/core';	

@Component({
  selector: 'app-confirmation-dialog',
  imports: [],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  @Input() message: string = '¿Está seguro de realizar esta acción?';
  @Output() confirm = new EventEmitter<boolean>();
  private dialogService = inject(DialogService);

  onConfirm() {
    console.log("Emitiendo confirmacion");
    this.confirm.emit(true);
    this.close(true);
  }

  onCancel() {
    console.log("Emitiendo cancelacion");
    this.confirm.emit(false);
    this.close(false);
  }

  close(value: boolean) {
    this.dialogService.closeDialog(value);
  }
}
