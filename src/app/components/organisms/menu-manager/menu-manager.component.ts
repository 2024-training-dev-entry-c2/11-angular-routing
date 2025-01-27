import { Component, inject } from '@angular/core';
import { MenuFormComponent } from '../../molecules/menu-form/menu-form.component';
import { ICreateMenuRequest } from '../../../services/menu/interfaces/menu-interface';
import { CreateMenuService } from '../../../services/menu/create-menu.service';

@Component({
  selector: 'app-menu-manager',
  imports: [MenuFormComponent],
  templateUrl: './menu-manager.component.html',
  styleUrl: './menu-manager.component.scss',
})
export class MenuManagerComponent {
  private createMenuService = inject(CreateMenuService);
  dishes: ICreateMenuRequest[] = [];

  addMenu(menu: ICreateMenuRequest) {
    this.createMenuService.execute(menu).subscribe({
      next: () => console.log('Plato creado con éxito'),
      // fetchDishes: () => this.fetchDishes(), TODO: Implementar RE-fetchMenu
      error: (error) => console.error('Error al crear el plato:', error),
    });
  }
}
