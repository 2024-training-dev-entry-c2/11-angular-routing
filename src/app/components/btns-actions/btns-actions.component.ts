import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btns-actions',
  templateUrl: './btns-actions.component.html',
  styleUrls: ['./btns-actions.component.scss'],
})
export class BtnsActionsComponent {
  @Output() editAction = new EventEmitter<void>();
  @Output() deleteAction = new EventEmitter<void>();

  onDelete(): void {
    this.deleteAction.emit();
  }

  onEdit(): void {
    this.editAction.emit();
  }
}
