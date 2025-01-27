import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateCustomer } from '@interfaces/create-customer.interface';
import { IInput } from '@interfaces/input.interface';
import { CustomersService } from '@services/customer/customers.service';
import { InputComponent } from '@shared/input/input.component';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule, CommonModule, InputComponent],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFormComponent {

  customerService = inject(CustomersService)
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  @Input({transform: booleanAttribute}) isUpdate: boolean = false;
  @Input() param: number = 0;

  customerForm = this.formBuilder.group({
    customer_name: ['',[ Validators.minLength(3)]],
    customer_email: ['',[ Validators.email]],
    customer_age: ['',[Validators.min(2)]],
    customer_phone: [''],
    customer_address: ['']

  });

  inputs: IInput[] = [
    {
      aria: 'customer_name',
      control: 'customer_name',
      name: 'customer_name',
      placeholder: 'Pedro Perez',
      title: 'Nombre',
      type: 'text',
    },
    {
      aria: 'customer_email',
      control: 'customer_email',
      name: 'customer_email',
      placeholder: 'pedroperez@correo.com',
      title: 'Correo',
      type: 'email',
    },
    {
      aria: 'customer_age',
      control: 'customer_age',
      name: 'customer_age',
      placeholder: '30',
      title: 'Edad',
      type: 'number',
    },
    {
      aria: 'customer_phone',
      control: 'customer_phone',
      name: 'customer_phone',
      placeholder: 'xxx-xxx-xxxx',
      title: 'Telefono',
      type: 'text',
    },
    {
      aria: 'customer_address',
      control: 'customer_address',
      name: 'customer_address',
      placeholder: 'Av. La Paz ',
      title: 'Direccion',
      type: 'text',
    }
  ];

  onSubmit(): void {
    if (this.customerForm.valid) {
      const body: ICreateCustomer = {
        ...this.customerForm.value as unknown as ICreateCustomer
      }
      if(!this.isUpdate){
        this.createCustomer(body);
      }else{
        this.updateCustomer(this.param, body);
      }
    }
  }

  createCustomer(body: ICreateCustomer){
    this.customerService.create(body).subscribe({
      next: (response) => {
        alert('Cliente creado con exito');
      },
      error: (err) => {
        alert('Error al realizar la operacion');
      },
      complete: () => {
        this.router.navigate(['/dashboard/customer/view']);
      }
    });
  }

  updateCustomer(id: number, body: ICreateCustomer){
    this.customerService.update(this.param, body).subscribe({
      next: (response) => {
        alert('Cliente actualizado con exito');
      },
      error: (err) => {
        alert('Error al realizar la operacion');
      },
      complete: () => {
        this.router.navigate(['/dashboard/customer/view']);
      }
    });
  }
 }
