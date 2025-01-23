import { Component, inject, OnInit } from '@angular/core';
import { TabsComponent } from '../../../components/tabs/tabs.component';
import { GetClientService } from '../../../services/client/get-client.service';
import { TableComponent } from '../../../components/table/table.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-clients',
  imports: [TabsComponent, TableComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  listClients: any[] = [];
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
  public clients = inject(GetClientService);

  ngOnInit(): void {
    this.clients.getClients().subscribe({
      next: (data) => {
        this.listClients = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // deleteClient(id: number): void {
  //   this.clients.deleteClient(id).subscribe({
  //     next: (data) => {
  //       this.listClients = data;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }
}
