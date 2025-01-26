import { Component } from '@angular/core';
import { GetMenuComponent } from '../get-menu/get-menu.component';




@Component({
  selector: 'app-menu',
  imports: [GetMenuComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {

}
