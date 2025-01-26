import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdenService } from '../../service/orden.service';
import { ICreateOrden } from '../../inferfaces/create-orden.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-orden',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-orden.component.html',
  styleUrl: './add-orden.component.scss'
})
export class AddOrdenComponent {
  private ordenService = inject(OrdenService)
  private formBuilder = inject(FormBuilder);
  public mensajeExito: string | null = null;

  statusOptions = ['PENDING', 'IN_PREPARATION', 'COMPLETED', 'CANCELLED', 'DELIVERED'];

  public ordenForm = this.formBuilder.group({
    priceTotal: [0],
    statusOrder: ['PENDING'],
    clientId: [0, [Validators.required]],
    items: this.formBuilder.array([])
  });

  get items() {
    return this.ordenForm.get('items') as FormArray;
  }
  ngOnInit(): void {
    this.ordenForm.valueChanges.subscribe((valores) => {
      console.log('Datos actuales del formulario:', valores);
    });

    this.addItem();
  }

  addItem(): void {
    const newItem = this.formBuilder.group({
      id: [this.items.length + 1],
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [1, Validators.required],
      restaurantId: [0, Validators.required],
      menuId: [0, Validators.required],
      ordenId: [0]
    });
    this.items.push(newItem);
    console.log('Items después de agregar:', this.items.value);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit(): void {
    if (this.ordenForm.valid) {
      const orderData: ICreateOrden = this.ordenForm.getRawValue() as ICreateOrden;

      this.ordenService.addOrden(orderData).subscribe({
        next: () => {
          this.mensajeExito = '¡Orden creada con éxito!';
          this.ordenForm.reset();

          setTimeout(() => {
            this.mensajeExito = null;
          }, 3000);
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }

}

