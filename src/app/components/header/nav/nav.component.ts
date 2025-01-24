import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavRoute } from '../../../interfaces/navRoute.interface';
import { LogoComponent } from '../logo/logo.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [LogoComponent, RouterLink, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  isRouteActive(routePath: string): boolean {
    return this.router.url === routePath;
  }

  navRoutes: NavRoute[] = [
    { name: 'Customer', path: '/customer', icon: 'person' },
    { name: 'Dish', path: '/dish', icon: 'restaurant' },
    { name: 'Menu', path: '/menu', icon: 'menu_book' },
    { name: 'Reservation', path: '/reservation', icon: 'event' },
    { name: 'Order', path: '/order', icon: 'shopping_cart' },
  ];
}
