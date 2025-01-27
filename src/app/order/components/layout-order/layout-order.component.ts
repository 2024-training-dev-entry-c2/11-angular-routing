import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
@Component({
  selector: 'app-layout-order',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout-order.component.html',
  styleUrl: './layout-order.component.scss'
})
export class LayoutOrderComponent {
  options = [{
    url: "agregar",
    name: "agregar"
  },
  {
    url: "buscar",
    name: "buscar"
  }
  ]
}
