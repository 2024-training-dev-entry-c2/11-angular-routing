import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
  @Input() icon!: string; // Icono del botón
  @Input() buttonIndex!: number; // Índice del botón (opcional)
  @Input() rowIndex!: number; // Índice de la fila
  @Output() buttonClick = new EventEmitter<number>(); // Evento para emitir al padre

  handleClick(): void {
    this.buttonClick.emit(this.rowIndex); // Emitir el índice de la fila
  }
}
