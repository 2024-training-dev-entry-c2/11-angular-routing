import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../../atoms/button/button.component";

@Component({
  selector: 'app-menu-card',
  imports: [ButtonComponent],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.scss',
})
export class MenuCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() dishesCount = 0;
}
