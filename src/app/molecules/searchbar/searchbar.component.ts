import { Component } from '@angular/core';
import { InputComponent } from "../../atoms/input/input.component";
import { ButtonComponent } from "../../atoms/button/button.component";

@Component({
  selector: 'app-searchbar',
  imports: [InputComponent, ButtonComponent],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {

}
