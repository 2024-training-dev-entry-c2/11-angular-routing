import { Component } from '@angular/core';
import { MainSectionStatsComponent } from "../main-section-stats/main-section-stats.component";
import { MainSectionClientsComponent } from "../main-section-clients/main-section-clients.component";

@Component({
  selector: 'app-main',
  imports: [MainSectionStatsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
