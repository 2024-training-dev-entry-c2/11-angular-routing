import { Component, inject, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../notification/services/notification.service';

@Component({
  selector: 'app-menu-delete',
  imports: [],
  template: '',
  styles: ''
})
export class MenuDeleteComponent implements OnInit {

  private menuService = inject(MenuService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  public idMenu: number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.idMenu = +idParam;
      }
      this.deleteMenu(this.idMenu);
    });
  }

  private deleteMenu(id: number): void {
    this.menuService.delete(id).subscribe({
      next: () => {
        this.notificationService.setNotification('success', 'Menú eliminado exitosamente.');
        this.router.navigate(['menus']); 
      },
      error: (err) => {
        console.error('Error al eliminar menú:', err);
        this.notificationService.setNotification('error', 'Error al eliminar el menú.');
      },
    });
  }

}
