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
    this.getAllDishesService.execute().subscribe((dishes) => {
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
    });
  }

  setFormData(menu: any): void {
    this.form.patchValue({
      name: menu.name,
    });

    const dishIdsArray = this.form.get('dishIds') as FormArray;
    dishIdsArray.clear();

    if (menu.dishIds && Array.isArray(menu.dishIds)) {
      menu.dishIds.forEach((dishId: number) => {
        dishIdsArray.push(this.fb.control(dishId, Validators.required));
      });
    }
  }

  submitAction(data: IMenu): void {
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
