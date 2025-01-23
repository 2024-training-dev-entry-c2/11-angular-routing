import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public listMenu = [
    {
      name: "Menú",
      path: "#"
    },
    {
      name: "Platos",
      path: "#"
    },
    {
      name: "Pedidos",
      path: "#"
    },
    {
      name: "Clientes",
      path: "#"
    },
  ]
}
