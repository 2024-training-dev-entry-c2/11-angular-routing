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
    { title: 'Add client', tabContent: 'tabContent0' },
    { title: 'List', tabContent: 'tabContent0' },
    { title: 'Delete', tabContent: 'tabContent0' },
    { title: 'Update', tabContent: 'tabContent0' },
  ];
}
