import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botton-delete',
  imports: [],
  templateUrl: './botton-delete.component.html',
  styleUrl: './botton-delete.component.scss'
})
export class BottonDeleteComponent {
  @Input() id!: number;
  @Output() deleteEvent = new EventEmitter<number>();

  onDelete(): void {
    this.deleteEvent.emit(this.id);
  }
}
