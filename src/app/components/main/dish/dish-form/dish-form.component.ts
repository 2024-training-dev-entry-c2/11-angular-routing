import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDishService } from '../../../../services/dish/add-dish.service';
import { EditDishService } from '../../../../services/dish/edit-dish.service';
import { DynamicInputComponent } from '../../../custom/custom-input/custom-input.component';

@Component({
  selector: 'app-dish-form',
  imports: [ReactiveFormsModule, DynamicInputComponent],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.scss',
})
export class DishFormComponent implements OnInit {
  dishForm: FormGroup;
  private addDishService = inject(AddDishService);
  private editDishService = inject(EditDishService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected dishId: number | null = null;

  inputConfigs = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      errorMessage: 'Name is required.',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      errorMessage: 'Price is required.',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      errorMessage: 'Description is required.',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.dishForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      isPopular: [false],
      isAvailable: [true],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.dishId = +id;
        this.loadDishData(this.dishId);
      }
    });
  }

  loadDishData(id: number): void {
    this.editDishService.getDish(id).subscribe((dish) => {
      this.dishForm.patchValue(dish);
    });
  }

  submit(): void {
    if (this.dishForm.valid) {
      const dishData = this.dishForm.value;
      if (this.dishId) {
        this.editDishService.updateDish(this.dishId, dishData).subscribe(() => {
          this.router.navigate(['/dish']);
        });
      } else {
        this.addDishService.execute(dishData).subscribe(() => {
          this.router.navigate(['/dish']);
        });
      }
    }
  }
}
