
import { ChangeDetectionStrategy, Component  } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-menu',
  imports: [RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent  {


}
