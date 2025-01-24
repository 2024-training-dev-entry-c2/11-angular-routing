import { Component } from '@angular/core';
import { TabsComponent } from '../../../components/tabs/tabs.component';
import { TableComponent } from '../../../components/table/table.component';

@Component({
  selector: 'app-dishfood',
  imports: [TabsComponent,TableComponent],
  templateUrl: './dishfood.component.html',
  styleUrl: './dishfood.component.scss'
})
export class DishfoodComponent {
  tabsList = [
    {
      title: 'Add client',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"',
    },
    {
      title: 'List',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-list"',
    },
  ];

  submit() {

  }

  
}
