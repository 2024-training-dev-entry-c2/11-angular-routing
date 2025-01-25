import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-main-section-clients',
  imports: [CommonModule],
  templateUrl: './main-section-clients.component.html',
  styleUrl: './main-section-clients.component.scss'
})
export class MainSectionClientsComponent {
  public data: any;
  public userData = input<any>();
  public tableContent= input<string[]>();


}
