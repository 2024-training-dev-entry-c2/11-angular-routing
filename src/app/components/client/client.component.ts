import { Component, ViewChild } from '@angular/core';
import { ClientHeaderComponent } from '../client-content/client-header/client-header.component';
import { SearchComponent } from '../search/search.component';
import { ClientMainComponent } from '../client-content/client-main/client-main.component';
import { IClient } from '../../interfaces/client.interface';

@Component({
  selector: 'app-client',
  imports: [ClientHeaderComponent, SearchComponent, ClientMainComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
searchQuery: string = ''; 

  @ViewChild(ClientMainComponent) clientMainComponent!: ClientMainComponent;

  onSearchQueryChange(query: string): void {
    this.searchQuery = query; 
  }

  onClientAdded(newClient: IClient): void {
     this.clientMainComponent.addClient(newClient);
  }
}
