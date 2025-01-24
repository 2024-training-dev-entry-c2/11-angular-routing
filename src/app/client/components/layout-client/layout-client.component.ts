import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout-client',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout-client.component.html',
  styleUrl: './layout-client.component.scss'
})
export class LayoutClientComponent {
  options = [{
    url: "agregar",
    name: "agregar"
  }, {
    url: "actualizar",
    name: "actualizar/:id"
  }, {
    url: "eliminar",
    name: "eliminar/:id"
  }, {
    url: "consultar por id",
    name: "buscar/:id"
  }
  ]
}
