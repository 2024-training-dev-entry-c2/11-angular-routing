import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddMenuService } from '../../../../services/menu/add-menu.service';
import { EditMenuService } from '../../../../services/menu/edit-menu.service';
import { GetAllDishesService } from '../../../../services/dish/get-all-dishes.service';
import { IDish } from '../../../../interfaces/dishResponse.interface';
import { CustomFormComponent } from '../../../custom/custom-form/custom-form.component';
import { FormTitleComponent } from '../../../custom/form-title/form-title.component';
import { IMenu } from '../../../../interfaces/menuResponse.interface';

@Component({
  selector: 'app-menu-form',
  imports: [CustomFormComponent, FormTitleComponent],
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss'],
})
export class MenuFormComponent implements OnInit {
  menuId: number | null = null;
  formData: IMenu | null = null;
  dishes: IDish[] = [];

  formConfig: {
    name: string;
    label: string;
    type?: string;
    errorMessage?: string;
    options?: { label: string; value: number }[];
  }[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      errorMessage: 'Name is required.',
    },
    {
      name: 'dishIds',
      label: 'Dishes',
      type: 'array',
      errorMessage: 'At least one dish is required.',
      options: [],
    },
  ];

  form!: FormGroup;

  private addMenuService = inject(AddMenuService);
  private editMenuService = inject(EditMenuService);
  private getAllDishesService = inject(GetAllDishesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      dishIds: this.fb.array([], Validators.required),
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.menuId = +id;
        this.loadMenuData(this.menuId);
      }
    });

    this.loadDishes();
  }

  loadMenuData(id: number): void {
    this.editMenuService.getMenu(id).subscribe((menu) => {
      this.formData = menu;
      this.setFormData(menu);
    });
  }

  loadDishes(): void {
    this.getAllDishesService.execute().subscribe(
      (dishes) => {
        this.dishes = dishes;

        const dishIdsConfig = this.formConfig.find(
          (config) => config.name === 'dishIds'
        );
        if (dishIdsConfig) {
          dishIdsConfig.options = dishes.map((dish) => ({
            label: dish.name,
            value: dish.id,
          }));
        }

        if (this.formData) {
          this.updateDishOptions();
        }
      },
      (error) => {
        console.error('Error loading dishes:', error);
      }
    );
  }

  setFormData(menu: IMenu): void {
    this.form.patchValue({
      name: menu.name,
      dishIds: menu.dishes.map((dish) => dish.id),
    });

    const dishIdsArray = this.form.get('dishIds') as FormArray;
    dishIdsArray.clear();

    if (menu.dishes) {
      menu.dishes.forEach((dish: IDish) => {
        dishIdsArray.push(this.fb.control(dish.id, Validators.required));
      });
    }

    if (this.dishes.length > 0) {
      this.updateDishOptions();
    }
  }

  updateDishOptions(): void {
    const dishIdsArray = this.form.get('dishIds') as FormArray;
    dishIdsArray.controls.forEach((control, index) => {
      const dishId = control.value;
      const dish = this.dishes.find((d) => d.id === dishId);
      if (dish) {
        control.setValue(dish.id);
      }
    });
  }

  submitAction(data: any): void {
    if (this.menuId) {
      this.editMenuService.updateMenu(this.menuId, data).subscribe(() => {
        this.router.navigate(['/menu']);
      });
    } else {
      this.addMenuService.execute(data).subscribe(() => {
        this.router.navigate(['/menu']);
      });
    }
  }
}
