import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botton-delete',
  imports: [],
  templateUrl: './botton-delete.component.html',
  styleUrl: './botton-delete.component.scss'
})
export class BottonDeleteComponent {
  @Input() idOrden!: number;
  @Output() deleteEvent = new EventEmitter<number>();


  deleteOrden(): void {
    if (this.idOrden) {
      this.deleteEvent.emit(this.idOrden);
      console.log('ID emitido:', this.idOrden);
    } else {
      console.error('idOrden es undefined');
    }
  }
}
