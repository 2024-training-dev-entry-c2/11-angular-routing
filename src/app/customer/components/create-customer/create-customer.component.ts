import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroupComponent } from '../../../form-group/components/form-group.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { CreateCustomerService } from '../../services/create-customer.service';
import { ICustomer } from '../../interfaces/customer.interface';

@Component({
  selector: 'app-create-customer',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormGroupComponent,
    FontAwesomeModule,
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss',
})
export class CreateCustomerComponent {
  private formBuilder = inject(FormBuilder);
  private createCustomerService = inject(CreateCustomerService);

  @Output() public closeModal = new EventEmitter<void>();
  @Output() public customerCreated = new EventEmitter<any>();

  isSubmitted = false;
  faX = faX;

  public createCustomerForm = this.formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    address: ['', Validators.required],
    isFrequent: false,
  });

  get nameControl(): FormControl {
    return this.createCustomerForm.get('name') as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.createCustomerForm.get('lastName') as FormControl;
  }

  get emailControl(): FormControl {
    return this.createCustomerForm.get('email') as FormControl;
  }

  get phoneControl(): FormControl {
    return this.createCustomerForm.get('phone') as FormControl;
  }

  get addressControl(): FormControl {
    return this.createCustomerForm.get('address') as FormControl;
  }

  close(): void {
    this.closeModal.emit();
  }

  createCustomer(event: Event): void {
    event.preventDefault();
    if (!this.createCustomerForm.valid) {
      this.isSubmitted = true;
      return;
    }
    this.createCustomerService
      .execute(this.createCustomerForm.getRawValue() as unknown as ICustomer)
      .subscribe((newCustomer) => {
        this.customerCreated.emit(newCustomer);
        this.closeModal.emit();
      });
  }
}
