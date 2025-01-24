import { Component } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { TabsComponent } from '../../../components/tabs/tabs.component';

@Component({
  selector: 'app-menus',
  imports: [TableComponent,TabsComponent],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss'
})
export class MenusComponent {
  tabsList = [
    {
      title: 'Add Menu',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"',
    },
    {
      title: 'List',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-list"',
    },
  ];
}
