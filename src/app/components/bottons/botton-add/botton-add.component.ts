import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-botton-add',
  imports: [],
  templateUrl: './botton-add.component.html',
  styleUrl: './botton-add.component.scss'
})
export class BottonAddComponent {
  @Output() buttonEvent = new EventEmitter<void>();

  onButtonClick() {
    this.buttonEvent.emit();
  }
}
