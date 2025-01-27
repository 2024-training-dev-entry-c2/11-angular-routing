import { Component, output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  imports: [],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss'
})
export class AddButtonComponent {
  public buttonClicked  = output();

  buttonIsClicked(){
    this.buttonClicked.emit();
  }
}
