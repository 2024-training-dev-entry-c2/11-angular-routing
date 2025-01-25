import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-main-section-menus',
  imports: [CurrencyPipe],
  templateUrl: './main-section-menus.component.html',
  styleUrl: './main-section-menus.component.scss'
})
export class MainSectionMenusComponent {
  public data: any;
  public menusData = input<any>();
  public tableContent= input<string[]>();
}
