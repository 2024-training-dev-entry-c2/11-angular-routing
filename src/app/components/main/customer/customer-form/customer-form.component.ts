import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCustomerService } from '../../../../services/customer/add-customer.service';
import { EditCustomerService } from '../../../../services/customer/edit-customer.service';
import { CustomFormComponent } from '../../../custom/custom-form/custom-form.component';
import { ICustomer } from '../../../../interfaces/customerResponse.interface';

@Component({
  selector: 'app-custom-form',
  imports: [CustomFormComponent],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent implements OnInit {
  customerId: number | null = null;
  formData: ICustomer | null = null;

  formConfig = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      errorMessage: 'First Name is required.',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      errorMessage: 'Last Name is required.',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      errorMessage: 'Valid Email is required.',
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
      errorMessage: 'Phone is required.',
    },
  ];

  private addCustomerService = inject(AddCustomerService);
  private editCustomerService = inject(EditCustomerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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
      this.formData = customer;
    });
  }

  submitAction(data: ICustomer): void {
    if (this.customerId) {
      this.editCustomerService
        .updateCustomer(this.customerId, data)
        .subscribe(() => {
          this.router.navigate(['/customer']);
        });
    } else {
      this.addCustomerService.execute(data).subscribe(() => {
        this.router.navigate(['/customer']);
      });
    }
  }
}
