import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-right-menu',
  imports: [RouterLink],
  templateUrl: './right-menu.component.html',
  styleUrl: './right-menu.component.scss'
})
export class RightMenuComponent {
  public items = input<{url: string, text: string}[]>();
}
