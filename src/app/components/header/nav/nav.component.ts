import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { NavRoute } from '../../../interfaces/NavRoute';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav',
  imports: [LogoComponent, RouterLink, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  navRoutes: NavRoute[] = [
    { name: 'Customer', path: '/customer', icon: 'person' },
    { name: 'Dish', path: '/dish', icon: 'restaurant' },
    { name: 'Menu', path: '/menu', icon: 'menu_book' },
    { name: 'Reservation', path: '/reservation', icon: 'event' },
    { name: 'Order', path: '/order', icon: 'shopping_cart' },
  ];
}
