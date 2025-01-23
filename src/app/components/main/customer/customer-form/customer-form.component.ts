import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddCustomerService } from '../../../../services/customer/add-customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent {
  customerForm: FormGroup;
  private addCustomerService = inject(AddCustomerService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      this.addCustomerService.execute(customerData).subscribe(() => {
        this.router.navigate(['/customer']);
      });
    }
  }
}
