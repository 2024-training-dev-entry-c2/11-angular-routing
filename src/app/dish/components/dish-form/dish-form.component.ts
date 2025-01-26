import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDish } from '../../interfaces/dish.interface';
import { DishService } from '../../services/dish.service';
import { MenuService } from '../../../menu/services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../notification/services/notification.service';
import { IMenu } from '../../../menu/interfaces/menu.interface';

@Component({
  selector: 'app-dish-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.scss'
})
export class DishFormComponent implements OnInit{

  private formBuilder = inject(FormBuilder);
  private dishService = inject(DishService);
  private menuService = inject(MenuService);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  @Input() title: String = '';
  @Input() action: String = '';
  public idDish?: number;
  public menu: IMenu | null = null;

  public form = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    precio: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    idMenu: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.idDish = +idParam;
      }

      if (idParam && this.action === 'update') {
        this.idDish = +idParam;
        this.loadDishData(this.idDish);
      }
    });
  }

  private loadDishData(id: number): void {
    this.dishService.processDishData(
      id,
      (dish) => {
        this.form.patchValue(dish);
      },
      (err) => {
        this.notificationService.setNotification('error', 'Error al cargar datos del plato.');
        console.error('Error al cargar datos del plato:', err);
      },
    );
  }

  private validateMenu(idMenu: number, onValid: () => void): void {
    this.menuService.processMenuData(
      idMenu,
      (menu) => {
        this.menu = menu;
        onValid(); 
      },
      (err) => {
        this.notificationService.setNotification('error', 'No se encontró un menú con esa ID.');
        console.error('Error al validar el menú:', err);
      }
    );
  }
  

  onSubmit() {
    if (this.form.invalid) {
      this.notificationService.setNotification('error', 'Formulario Invalido.');
      return;
    }

    const dish: IDish = this.form.value as IDish;

    this.validateMenu(dish.idMenu, () => {
      if (this.action === 'save') {
        this.saveDish(dish);
      } else if (this.action === 'update' && this.idDish) {
        this.updateDish(this.idDish, dish);
      }
    });
  }

  saveDish(dish: IDish) {
    this.dishService.save(dish).subscribe({
      next: () => {
        this.notificationService.setNotification('success', 'Plato guardado con éxito');
        this.router.navigate(['platos']);
      },
      error: () => this.notificationService.setNotification('error', 'Error al guardar el plato'),
    });
  }

  updateDish(idDish: number, dish: IDish) {
    this.dishService.update(idDish, dish).subscribe({
      next: () => {
        this.notificationService.setNotification('success', 'Plato actualizado con éxito');
        this.router.navigate(['platos']);
      },
      error: () => this.notificationService.setNotification('error', 'Error al actualizar el plato'),
    });
  }

}
