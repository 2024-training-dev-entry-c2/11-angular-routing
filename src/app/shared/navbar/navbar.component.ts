import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Link } from '@interfaces/link.interface';
import { LinkComponent } from "../link/link.component";

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, LinkComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  links: Link[] =[
    {
      text:'inicio',
      url:'/dashboard/home',
      aria:'Ir a la pagina principal'
    },
    {
      text:'clientes',
      url:'/dashboard/customer',
      aria:'Administrar clientes'
    },
    {
      text:'menus',
      url:'/dashboard/menu',
      aria:'Administrar menus'
    },
    {
      text:'platos',
      url:'/dashboard/dishes',
      aria:'Administrar platos'
    },
    {
      text:'ordenes',
      url:'/dashboard/orders',
      aria:'Administrar ordenes'
    }

  ]

 }
