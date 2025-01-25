import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdenService } from '../../service/orden.service';
import { ICreateOrden } from '../../inferfaces/create-orden.interface';

@Component({
  selector: 'app-add-orden',
  imports: [ReactiveFormsModule],
  templateUrl: './add-orden.component.html',
  styleUrl: './add-orden.component.scss'
})
export class AddOrdenComponent {
  private ordenService = inject(OrdenService)
  private formBuilder = inject(FormBuilder);

  statusOptions = ['PENDING', 'IN_PREPARATION', 'COMPLETED', 'CANCELLED', 'DELIVERED'];

  public createItem = this.formBuilder.group({
    id: [0],
    name: ['', Validators.required],
    price: [0, Validators.required],
    quantity: [0, Validators.required],
    restaurantId: [0, Validators.required],
    menuId: [0, Validators.required],
    ordenId: [0]
  });

  public ordenForm = this.formBuilder.group({
    priceTotal: [0],
    statusOrder: ['PENDING'],
    clientId: [0, [Validators.required]],
    items: this.formBuilder.array([this.createItem])
  });

  get items(): FormArray {
    return this.ordenForm.get('items') as FormArray;
  }

  addItem(): void {
    const newItem = this.formBuilder.group({
      ...this.createItem.value,
      id: this.items.length + 1
    });
    this.items.push(newItem);
  }


  removeItem(index: number): void {
    this.items.removeAt(index);
  }


  onSubmit(): void {
    if (this.ordenForm.valid) {
      const orderData: ICreateOrden = this.ordenForm.value as unknown as ICreateOrden;
      console.log(orderData);
    } else {
      console.log('Formulario inválido');
    }
  }
}

