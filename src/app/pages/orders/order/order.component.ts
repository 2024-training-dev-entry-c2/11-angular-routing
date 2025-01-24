import { Component } from '@angular/core';
import { TabsComponent } from '../../../components/tabs/tabs.component';
import { TableComponent } from '../../../components/table/table.component';

@Component({
  selector: 'app-order',
  imports: [TabsComponent,TableComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  tabsList = [
    {
      title: 'Add Order',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"',
    },
    {
      title: 'List',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-list"',
    },
  ];

}
