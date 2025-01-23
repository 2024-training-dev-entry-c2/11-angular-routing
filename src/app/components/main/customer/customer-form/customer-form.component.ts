import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCustomerService } from '../../../../services/customer/add-customer.service';
import { EditCustomerService } from '../../../../services/customer/edit-customer.service';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  private addCustomerService = inject(AddCustomerService);
  private editCustomerService = inject(EditCustomerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected customerId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.customerId = +id;
        this.loadCustomerData(this.customerId);
      }
    });
  }

  loadCustomerData(id: number): void {
    this.editCustomerService.getCustomer(id).subscribe((customer) => {
      this.customerForm.patchValue(customer);
    });
  }

  submit(): void {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      if (this.customerId) {
        this.editCustomerService
          .updateCustomer(this.customerId, customerData)
          .subscribe(() => {
            this.router.navigate(['/customer']);
          });
      } else {
        this.addCustomerService.execute(customerData).subscribe(() => {
          this.router.navigate(['/customer']);
        });
      }
    }
  }
}
