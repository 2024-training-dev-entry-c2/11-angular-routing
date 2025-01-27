import { Component, inject } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDish } from '../../inferfaces/add-menu.interface';
@Component({
  selector: 'app-add-dish',
  imports: [ReactiveFormsModule],
  templateUrl: './add-dish.component.html',
  styleUrl: './add-dish.component.scss'
})
export class AddDishComponent {
  private dishService = inject(DishService)
  private formBuilder = inject(FormBuilder);

  public mensajeExito: string | null = null;
  isEditMode: boolean = false;

  public dishForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required]],
    menuRestaurantId: [0]
    });
    onSubmit(): void {
        if (this.dishForm.valid) {
          const dishData: IDish = this.dishForm.getRawValue() as IDish;
          console.log("plato :", JSON.stringify(dishData, null, 2));
    this.dishService.addDish(dishData).subscribe({
      next: () => {
        this.mensajeExito = '¡Plato creado con éxito!';
        this.dishForm.reset();
        setTimeout(() => {
          this.mensajeExito = null;
        }, 3000);
      },
      error: (error : any) => {
        console.error('Error al crear el plato', error);
      }
    });
  }
}
}
