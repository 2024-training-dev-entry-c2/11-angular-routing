import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { DishService } from '../../../services/dish.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDish } from '../../../inferfaces/add-menu.interface';
@Component({
  selector: 'app-add-dish',
  imports: [ReactiveFormsModule],
  templateUrl: './add-dish.component.html',
  styleUrl: './add-dish.component.scss'
})
export class AddDishComponent {
  private dishService = inject(DishService)
  private formBuilder = inject(FormBuilder);
  @Input() dishSelect: IDish | null = null;
  @Output() dishUpdated = new EventEmitter<IDish>();
  public mensajeExito: string | null = null;

  isEditMode: boolean = false;

  public dishForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required]],
    menuRestaurantId:[1, Validators.required]
    });

   ngOnChanges(changes: SimpleChanges) {
    if (changes['dishSelect'] && this.dishSelect) {
      this.isEditMode = true;

      this.dishForm.patchValue({
        name: this.dishSelect.name,
        price: this.dishSelect.price,
        menuRestaurantId:1
      });
    } else {
      this.isEditMode = false;
    }
  }

  onSubmit(): void {
    if (this.dishForm.valid) {
      const dishData: IDish = this.dishForm.getRawValue() as IDish;
      console.log("dish:", JSON.stringify(dishData, null, 2));
      if (this.dishSelect) {
        dishData.id = this.dishSelect.id;
        this.dishService.updateDish(dishData).subscribe({
          next: () => {
            this.mensajeExito = '¡Plato actualizado con éxito!';
            this.dishUpdated.emit(dishData);
            setTimeout(() => {
              this.mensajeExito = null;
              this.dishForm.reset();
            }, 2000);
          },
        });
      } else {
        this.dishService.addDish(dishData).subscribe({
          next: () => {
            this.mensajeExito = '¡Plato creado con éxito!';
            this.dishUpdated.emit(dishData);
            setTimeout(() => {
              this.mensajeExito = null;
              this.dishForm.reset();
            }, 2000);
          },
        });
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}

