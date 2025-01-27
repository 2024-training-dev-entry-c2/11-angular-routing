import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditDishService } from '../../../../services/dish/edit-dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IMenu } from '../../../../interfaces/menu.interface';
import { GetAllMenuService } from '../../../../services/menu/get-all-menu.service';
import { AddDishService } from '../../../../services/dish/add-dish.service';
import { DynamicInputComponent } from '../../../custom/dynamic-input/dynamuc-input.component';

@Component({
  selector: 'app-dish-form',
  imports: [ReactiveFormsModule, CommonModule, DynamicInputComponent],
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.scss']
})
export class DishFormComponent implements OnInit {
  dishForm: FormGroup;
  menus: IMenu[] = [];
  private editDishService = inject(EditDishService);
  private addDishService = inject(AddDishService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected dishId: number | null = null;
  isLoading = true;

  nameConfig = {
    name: 'name',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Escribe el nombre del plato',
    errorMessage: 'El nombre es requerido.',
  };

  descriptionConfig = {
    name: 'description',
    label: 'Descripción',
    type: 'text',
    placeholder: 'Escribe una breve descripción',
    errorMessage: 'La descripción es requerida.',
  };

  priceConfig = {
    name: 'price',
    label: 'Precio',
    type: 'number',
    placeholder: 'Escribe el precio del plato',
    errorMessage: 'El precio es requerido.',
  };

  menuConfig = {
    name: 'menuId',
    label: 'Menú',
    type: 'select',
    options: [] as { label: string; value: any }[],
    errorMessage: 'Selecciona un menú.',
  };

  constructor(
    private fb: FormBuilder,
    private getAllMenuService: GetAllMenuService
  ) {
    this.dishForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      menuId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.dishId = +id;
        this.dishData(this.dishId);
      } else {
        this.isLoading = false;
      }
    });
    this.loadMenus();
  }

  dishData(id: number): void {
    this.editDishService.getDish(id).subscribe({
      next: (dish) => {
        this.dishForm.patchValue({
          name: dish.name,
          description: dish.description,
          price: dish.price,
          menuId: dish.menu ? dish.menu.id : '',
        });
        this.isLoading = false;
      },
      error: (e) => {
        console.error('Error al cargar los datos del plato:', e);
        this.isLoading = false;
      },
    });
  }

  loadMenus(): void {
    this.getAllMenuService.execute().subscribe({
      next: (menus) => {
        this.menus = menus;
        this.menuConfig.options = menus.map((menu) => ({
          label: menu.name,
          value: menu.id,
        }));
      },
      error: (e) => {
        console.error('Error al cargar los menús:', e);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  submit(): void {
    if (this.dishForm.invalid) {
      console.error('Formulario inválido');
      return;
    }
    
    const dishData = this.dishForm.value;
    if (this.dishId) {
      this.editDishService.updateDish(this.dishId, dishData).subscribe({
        next: () => {
          this.router.navigate(['/dish']);
        },
        error: (e) => {
          console.error('Error al actualizar el plato:', e);
        },
      });
    } else {
      this.addDishService.execute(dishData).subscribe({
        next: () => {
          this.router.navigate(['/dish']);
        },
        error: (e) => {
          console.error('Error al crear el plato:', e);
        },
      });
    }
  }
}
