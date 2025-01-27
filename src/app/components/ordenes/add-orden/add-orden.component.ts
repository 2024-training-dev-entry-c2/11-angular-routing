import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdenService } from '../../../services/orden.service';
import { ICreateOrden } from '../../../inferfaces/create-orden.interface';
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

  @Input() ordenSelect: ICreateOrden | null = null;
  isEditMode: boolean = false;

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
  ngOnChanges(changes: SimpleChanges) {
    if (changes['ordenSelect'] && this.ordenSelect) {
      this.isEditMode = true;

      this.ordenForm.patchValue({
        priceTotal: this.ordenSelect.priceTotal,
        clientId: this.ordenSelect.clientId,
        statusOrder: this.ordenSelect.statusOrder,
      });

      this.items.clear();

      this.ordenSelect.items.forEach(item => {
        this.items.push(this.formBuilder.group({
          name: [item.name, Validators.required],
          price: [item.dish?.price || 0, Validators.required],
          quantity: [item.quantity, Validators.required],
          restaurantId: [1],
          menuId: [1],
          ordenId: [item.id],
          dish: this.formBuilder.group({
            id: [item.dish?.id || null],
            name: [item.dish?.name || '', Validators.required],
            price: [item.dish?.price || 0, Validators.required],
            popular: [item.dish?.popular || false],
          })
        }));
      });
    }else {
      this.isEditMode = false;
    }
  }
  onSubmit(): void {
    if (this.ordenForm.valid) {
      const orderData: ICreateOrden = this.ordenForm.getRawValue() as ICreateOrden;
      console.log("orden:", JSON.stringify(orderData, null, 2));
      if (this.ordenSelect) {
        console.log(this.ordenSelect.id)
        orderData.id = this.ordenSelect.id;
        this.ordenService.updateOrden(orderData).subscribe({
          next: () => {
            this.mensajeExito = '¡Orden actualizada con éxito!';
            this.ordenForm.reset();
            setTimeout(() => {
              this.mensajeExito = null;
            }, 3000);
          },
        });
      } else {
        this.ordenService.addOrden(orderData).subscribe({
          next: () => {
            this.mensajeExito = '¡Orden creada con éxito!';
            this.ordenForm.reset();
            setTimeout(() => {
              this.mensajeExito = null;
            }, 3000);
          },
        });
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}

