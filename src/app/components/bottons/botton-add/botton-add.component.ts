import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-botton-add',
  imports: [],
  templateUrl: './botton-add.component.html',
  styleUrl: './botton-add.component.scss'
})
export class BottonAddComponent {
  @Output() addDishEvent = new EventEmitter<void>();

  openAddDish() {
    this.addDishEvent.emit();
  }
}
