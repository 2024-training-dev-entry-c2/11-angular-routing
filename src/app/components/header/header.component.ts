import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  activeRoute = '';
  faPiggyBank = faPiggyBank;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.activeRoute = event.urlAfterRedirects;
    })
  }

  logout() {
    this.authService.logout();
  }

  isActive(route: string): boolean {
    return this.activeRoute.includes(route)
  }
}
