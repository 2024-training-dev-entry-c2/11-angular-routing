import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../../components/modal/modal.component';
import { DishService } from '../../../services/dish/dish.service';
import { Dishfood, DishfoodRequest } from '../../../interfaces/menu.interface';

@Component({
  selector: 'app-dishfood',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './dishfood.component.html',
  styleUrl: './dishfood.component.scss',
})
export class DishfoodComponent {
  public dishfood = inject(DishService);
  private formaddBuilder = inject(FormBuilder);
  showModal = false;
  getData: DishfoodRequest | any = {
    name: '',
    price: 10.0,
    isPopular: false,
  };
  @Input() getMenuid: number = 0;
  @Input() showModalDish!: boolean;
  @Output() closeModalDish = new EventEmitter<void>();
  public dishfoodUpdatedForm = this.formaddBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    price: [10.0, [Validators.required]],
    isPopular: [false],
    menuId: [this.getMenuid, [Validators.required]],
  });
  addMenu() {
    console.log(this.dishfoodUpdatedForm.getRawValue() );
    
    const addDishPayload = {
      name: this.dishfoodUpdatedForm.get('name')?.value,
      price: this.dishfoodUpdatedForm.get('price')?.value,
      isPopular: this.dishfoodUpdatedForm.get('isPopular')?.value,
      menuId: this.getMenuid
    };
    if (this.dishfoodUpdatedForm.valid) {
      this.dishfood
        .addDish(addDishPayload as unknown as Dishfood)
        .subscribe({
          next: (data) => {
            console.log(data);
            alert('Dishfood added successfully');
            this.showModal = false;
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
  closeModal() {
    this.closeModalDish.emit();
  }

}
