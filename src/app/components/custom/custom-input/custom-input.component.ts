import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditMenuService } from '../../../services/menu/edit-menu.service';
import { IDish } from '../../../interfaces/dishResponse.interface';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  imports: [ReactiveFormsModule],
})
export class CustomInputComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() config!: {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    errorMessage?: string;
    options?: { label: string; value: any }[];
  };
  @Input() menuId!: number | null;

  dishes: IDish[] = [];

  constructor(private editMenuService: EditMenuService) {}

  ngOnInit(): void {
    console.log('Menu ID:', this.menuId);
    if (this.config.name === 'dishIds' && this.menuId) {
      this.loadMenuDishes(this.menuId);
    }
  }

  get control(): FormControl | FormArray {
    return this.formGroup.get(this.config.name) as FormControl | FormArray;
  }

  get isArray(): boolean {
    return this.control instanceof FormArray;
  }

  loadMenuDishes(menuId: number): void {
    this.editMenuService.getMenu(menuId).subscribe((menu) => {
      this.dishes = menu.dishes;
      this.updateDishOptions();
    });
  }

  updateDishOptions(): void {
    if (this.config.name === 'dishIds') {
      this.config.options = this.dishes.map((dish) => ({
        label: dish.name,
        value: dish.id,
      }));

      const dishIdsArray = this.control as FormArray;
      dishIdsArray.clear();

      this.dishes.forEach((dish) => {
        dishIdsArray.push(new FormControl(dish.id, Validators.required));
      });
    }
  }

  addItem(value: any): void {
    if (this.control instanceof FormArray) {
      this.control.push(new FormControl(value, Validators.required));
    }
  }

  removeItem(index: number): void {
    if (this.control instanceof FormArray) {
      this.control.removeAt(index);
    }
  }

  getFormArrayControls(): FormControl[] {
    return (this.control as FormArray).controls as FormControl[];
  }
}
