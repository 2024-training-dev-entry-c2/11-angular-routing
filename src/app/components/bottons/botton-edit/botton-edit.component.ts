import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botton-edit',
  imports: [],
  templateUrl: './botton-edit.component.html',
  styleUrl: './botton-edit.component.scss'
})
export class BottonEditComponent {
  @Input() id!: number;
  @Output() editEvent = new EventEmitter<number>();

  onEdit(): void {
    this.editEvent.emit(this.id);
  }
}
