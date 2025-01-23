import { Component, inject, OnInit } from '@angular/core';
import { TabsComponent } from '../../../components/tabs/tabs.component';
import { GetClientService } from '../../../services/client/get-client.service';

@Component({
  selector: 'app-clients',
  imports: [TabsComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  tabsList = [
    { title: 'Add client', tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"' },
    { title: 'List', tabContent: '"assets/icons/form-svgrepo-com.svg#icon-list"' },
    { title: 'Delete', tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"' },
    { title: 'Update', tabContent: '"assets/icons/form-svgrepo-com.svg#icon-update"' },
  ];
  private clients= inject(GetClientService);

  ngOnInit(): void {
    this.clients.getClients().subscribe((clients) => {
      console.log(clients);
    }); 
  }


}
