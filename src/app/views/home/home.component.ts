import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
