import { Component, inject } from '@angular/core';
import { IDish } from '../../interfaces/dish.interface';
import { DishService } from '../../services/dish.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../../notification/services/notification.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dish-get-by-id',
  imports: [ReactiveFormsModule,CurrencyPipe],
  templateUrl: './dish-get-by-id.component.html',
  styleUrl: './dish-get-by-id.component.scss'
})
export class DishGetByIdComponent {
  private formBuilder = inject(FormBuilder);
  private dishService = inject(DishService);
  private notificationService = inject(NotificationService);

  public id: number = 0;
  public dish: IDish | null = null;

  public form = this.formBuilder.group({
    id: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  });

  public loadDishData(id: number): void {
    this.dishService.getById(id).subscribe({
      next: (dish) => {
        this.dish = dish;
      },
      error: () => {
        this.notificationService.setNotification('error', 'No se encontró un plato con esa ID');
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log('Formulario inválido:', this.form.value);
      return;
    }

    this.id = +this.form.get('id')!.value!;
    this.loadDishData(this.id);
  }
}
