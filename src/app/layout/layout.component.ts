import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../components/header/header.component";
import { SalesCardComponent } from '../components/sales-card/sales-card.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent,SalesCardComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
