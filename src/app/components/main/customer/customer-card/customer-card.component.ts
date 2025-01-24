import { Component, Input } from '@angular/core';
import { ICustomer } from '../../../../interfaces/customerResponse.interface';
import { DeleteCustomerService } from '../../../../services/customer/delete-customer.service';
import { ConfirmModelComponent } from '../../confirm-model/confirm-model.component';
import { Router } from '@angular/router';
import { BtnsActionsComponent } from '../../../custom/btns-actions/btns-actions.component';

@Component({
  selector: 'app-customer-card',
  imports: [ConfirmModelComponent, BtnsActionsComponent],
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss'],
})
export class CustomerCardComponent {
  @Input() customer!: ICustomer;
  isModalOpen = false;

  constructor(
    private deleteCustomerService: DeleteCustomerService,
    private router: Router
  ) {}

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this.deleteCustomerService
      .deleteCustomer(this.customer.id)
      .subscribe(() => {
        this.closeModal();
        window.location.reload();
      });
  }

  editCustomer(): void {
    this.router.navigate(['/customer/edit', this.customer.id]);
  }
}
