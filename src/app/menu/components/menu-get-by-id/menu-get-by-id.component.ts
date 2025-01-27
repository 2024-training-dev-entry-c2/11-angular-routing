import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMenu } from '../../interfaces/menu.interface';
import { MenuService } from '../../services/menu.service';
import { NotificationService } from '../../../notification/services/notification.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-menu-get-by-id',
  imports: [ReactiveFormsModule,CurrencyPipe],
  templateUrl: './menu-get-by-id.component.html',
  styleUrl: './menu-get-by-id.component.scss'
})
export class MenuGetByIdComponent {
  private formBuilder = inject(FormBuilder);
  private menuService = inject(MenuService);
  private notificationService = inject(NotificationService);

  public id: number = 0;
  public menu: IMenu | null = null;

  public form = this.formBuilder.group({
    id: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  });

  public loadMenuData(id: number): void {
    this.menuService.processMenuData(
      id,
      (menu) => {
        this.menu = menu;
      },
      (err) => {
        this.notificationService.setNotification('error', 'No se encontró un menú con esa ID.');
        console.error('Error al cargar menú:', err);
      },
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      this.notificationService.setNotification('error', 'Formulario invalido');
      return;
    }

    this.id = +this.form.get('id')!.value!;
    this.loadMenuData(this.id);
  }
}
