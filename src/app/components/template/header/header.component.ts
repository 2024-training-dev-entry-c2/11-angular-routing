import { Component, input } from '@angular/core';
import { MenuComponent } from "./menu/menu.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MenuComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public iconUrl = input<string>();
  public items = input<{url: string, text: string}[]>();
  public user = input<string>();
  public contentBtn = input<{url: string, text: string}>();
}
