import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-main-section-dishes',
  imports: [CurrencyPipe],
  templateUrl: './main-section-dishes.component.html',
  styleUrl: './main-section-dishes.component.scss'
})
export class MainSectionDishesComponent {
  public data: any;
  public dishData = input<any>();
  public tableContent= input<string[]>();
}
