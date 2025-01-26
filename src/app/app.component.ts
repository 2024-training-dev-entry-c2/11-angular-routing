import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DishManagerComponent } from "./components/organisms/dish-manager/dish-manager.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DishManagerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'restaurant-mockup';
}
