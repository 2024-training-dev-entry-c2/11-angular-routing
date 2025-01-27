import { Component, inject } from '@angular/core';
import { MenuService } from '../../../../core/services/menu.service';
import { AuthService } from '../../../auth/services/auth.services';

@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  isCollapsed = false;
  user = inject(AuthService);
  menuService = inject(MenuService);

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  logout(): void {
    this.user.logout();
  }

  selectMenu(menu: string): void {
    this.menuService.setSelectedMenu(menu); // Actualiza el menú seleccionado
  }

}
