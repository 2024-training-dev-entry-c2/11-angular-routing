import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../../atoms/button/button.component";
import { IMenuResponse } from '../../../services/menu/interfaces/menu-interface';

@Component({
  selector: 'app-menu-card',
  imports: [ButtonComponent],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.scss',
})
export class MenuCardComponent {
  @Input() menu!: IMenuResponse;
}
