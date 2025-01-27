import { Component } from '@angular/core';
import { SearchbarComponent } from "../../molecules/searchbar/searchbar.component";

@Component({
  selector: 'app-home',
  imports: [SearchbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
