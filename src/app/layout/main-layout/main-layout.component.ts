import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../features/dashboard/components/footer/footer.component';
import { HeaderComponent } from '../../features/dashboard/components/header/header.component';
import { SideBarComponent } from '../../features/dashboard/components/side-bar/side-bar.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { DashLayoutComponent } from '../dash-layout/dash-layout.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    HeaderComponent,
    SideBarComponent,
    RouterModule,
    FooterComponent,
    AlertComponent,
    DashLayoutComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
