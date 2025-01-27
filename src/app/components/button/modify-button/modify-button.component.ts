import { Component, output } from '@angular/core';

@Component({
  selector: 'app-modify-button',
  imports: [],
  templateUrl: './modify-button.component.html',
  styleUrl: './modify-button.component.scss'
})
export class ModifyButtonComponent {
  public buttonClicked  = output();

  buttonIsClicked(){
    this.buttonClicked.emit();
  }
}
 