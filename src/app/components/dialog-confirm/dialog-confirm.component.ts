import { Component, inject, input, output } from '@angular/core';
import { CorfimDialogService, IDialog } from '../../services/corfim-dialog.service';

@Component({
  selector: 'app-dialog-confirm',
  imports: [],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss'
})
export class DialogConfirmComponent {

  private dialogService = inject(CorfimDialogService);

  dialogData: IDialog | undefined;
  clickLeftButton = output();
  clickRightButton = output();
  presentDialog = input<boolean>(true);
  showDialog = false;

  constructor() {
    this.dialogService.$dialogData.subscribe(dialogData => {
      this.showDialog = true;
      this.dialogData = dialogData;
    });
  }

  onClose() {
    this.showDialog = false;
  }

  onClickLeftButton() {
    this.showDialog = false;
    this.clickLeftButton.emit();
  }

  onClickRightButton() {
    this.clickRightButton.emit();
  }


}
