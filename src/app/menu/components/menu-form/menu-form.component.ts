import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMenu } from '../../interfaces/menu.interface';
import { MenuService } from '../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../notification/services/notification.service';


@Component({
  selector: 'app-menu-form',
  imports: [ReactiveFormsModule],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.scss'
})
export class MenuFormComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private menuService = inject(MenuService);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  @Input() title: String = '';
  @Input() action: String = '';
  public idMenu?: number;

  public form = this.formBuilder.group({
    nombre: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.idMenu = +idParam;
      }

      if (idParam && this.action === 'update') {
        this.idMenu = +idParam;
        this.loadMenuData(this.idMenu);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('Formulario inválido');
      return;
    }
    const menu: IMenu = this.form.value as IMenu;

    if (this.action === 'save') {
      this.saveMenu(menu);
    } else if (this.action === 'update' && this.idMenu) {
      this.updateMenu(this.idMenu, menu);
    }
  }

  private loadMenuData(id: number): void {
    this.menuService.processMenuData(
      id,
      (menu) => {
        this.form.patchValue(menu);
      },
      (err) => {
        this.notificationService.setNotification('error', 'Error al cargar datos del menú.');
        console.error('Error al cargar datos del menú:', err);
      },
    );
  }

  saveMenu(menu: IMenu) {
    this.menuService.save(menu).subscribe({
      next: () => {
        this.notificationService.setNotification('success', 'Menú guardado con éxito.');
        this.router.navigate(['menus']);
      },
      error: (err) =>
        this.notificationService.setNotification('error', 'Error al guardar el menú.'),
    });
  }

  updateMenu(idMenu: number, menu: IMenu) {
    this.menuService.update(idMenu, menu).subscribe({
      next: () => {
        this.notificationService.setNotification('success', 'Menú actualizado con éxito.');
        this.router.navigate(['menus']);
      },
      error: (err) =>
        this.notificationService.setNotification('error', 'Error al actualizar el menú.'),
    });
  }

}
