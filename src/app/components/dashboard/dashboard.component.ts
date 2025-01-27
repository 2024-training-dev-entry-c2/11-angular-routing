import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
