import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDishService } from '../../../../services/dish/add-dish.service';
import { EditDishService } from '../../../../services/dish/edit-dish.service';
import { CustomFormComponent } from '../../../custom/custom-form/custom-form.component';
import { IDish } from '../../../../interfaces/dishResponse.interface';

@Component({
  selector: 'app-dish-form',
  imports: [CustomFormComponent],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.scss',
})
export class DishFormComponent implements OnInit {
  dishId: number | null = null;
  formData: IDish | null = null;

  formConfig = [
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
    {
      name: 'isPopular',
      label: 'Is Popular',
      type: 'checkbox',
      errorMessage: 'Is Popular is required.',
    },
    {
      name: 'isAvailable',
      label: 'Is Available',
      type: 'checkbox',
      errorMessage: 'Is Available is required.',
    },
  ];

  private addDishService = inject(AddDishService);
  private editDishService = inject(EditDishService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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
      this.formData = dish;
    });
  }

  submitAction(data: IDish): void {
    if (this.dishId) {
      this.editDishService.updateDish(this.dishId, data).subscribe(() => {
        this.router.navigate(['/dish']);
      });
    } else {
      this.addDishService.execute(data).subscribe(() => {
        this.router.navigate(['/dish']);
      });
    }
  }
}
