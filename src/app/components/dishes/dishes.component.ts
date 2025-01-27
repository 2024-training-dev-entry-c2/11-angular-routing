import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-dishes',
  imports: [RouterOutlet],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishesComponent {

}
