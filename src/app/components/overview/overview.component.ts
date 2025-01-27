import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
    bentoItems = [
      { title: 'Ordenes totales', icon: 'svg/order.svg#order', count: '27 ordenes' },
      { title: 'Menus agregados', icon: 'svg/menu.svg#menu', count: '27 Menus' },
      { title: 'Platos agregados', icon: 'svg/dish.svg#dish', count: '27 Platos' }
    ];
  
    trackByFn(index: number, item: any): string {
      return item.title; 
    }
}
