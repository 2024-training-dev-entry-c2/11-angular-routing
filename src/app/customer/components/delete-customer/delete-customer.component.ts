import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { DeleteCustomerService } from '../../services/delete-customer.service';

@Component({
  selector: 'app-delete-customer',
  imports: [FontAwesomeModule],
  templateUrl: './delete-customer.component.html',
  styleUrl: './delete-customer.component.scss',
})
export class DeleteCustomerComponent {
  public deleteCustomerService = inject(DeleteCustomerService);

  faX = faX;
  faExclamationCircle = faExclamationCircle;

  @Input() public selectedIdCustomer!: number;
  @Output() public closeModal = new EventEmitter<void>();
  @Output() public customerDeleted = new EventEmitter<number>();

  close(): void {
    this.closeModal.emit();
  }

  deleteCustomer(): void {
    this.deleteCustomerService
      .execute(this.selectedIdCustomer)
      .subscribe(() => {
        this.customerDeleted.emit(this.selectedIdCustomer);
        this.closeModal.emit();
      });
  }
}
