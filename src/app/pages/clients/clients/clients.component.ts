import { Component } from '@angular/core';
import { TabsComponent } from '../../../components/tabs/tabs.component';

@Component({
  selector: 'app-clients',
  imports: [TabsComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {
  tabsList = [
    { title: 'Add client', tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"' },
    { title: 'List', tabContent: '"assets/icons/form-svgrepo-com.svg#icon-list"' },
    { title: 'Delete', tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"' },
    { title: 'Update', tabContent: '"assets/icons/form-svgrepo-com.svg#icon-update"' },
  ];
}
