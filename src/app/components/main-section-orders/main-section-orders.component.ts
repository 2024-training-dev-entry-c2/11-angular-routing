import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { IOrders } from '../../interface/orders.interface';
import { getClientsService } from '../../services/clients.service';
import { getOrderService } from '../../services/orders.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DataManagementService } from '../../services/data.service';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalActionDeleteComponent } from '../modal-action-delete/modal-action-delete.component';
import { ModalDeleteService } from '../../services/modal-delete.service';

@Component({
  selector: 'app-main-section-orders',
  imports: [
    DatePipe,
    CurrencyPipe,
    CommonModule,
    ModalComponent,
    ModalActionDeleteComponent,
  ],
  templateUrl: './main-section-orders.component.html',
  styleUrl: './main-section-orders.component.scss',
})
export class MainSectionOrdersComponent {
  public data: any;
  public orderData: Observable<IOrders[]>;
  public tableContent = input<string[]>();
  private inputService = inject(getOrderService);
  private formBuilder = inject(FormBuilder);
  private subscription!: Subscription;
  private orderToDeleteSubscription!: Subscription;
  private orderToDelete: IOrders | null = null;

  public orderForm = this.formBuilder.group({
    clientName: ['', [Validators.required, Validators.minLength(3)]],
    clientEmail: ['', [Validators.required, Validators.email]],
    dishes: ['', [Validators.required]],
  });

  formData = [
    { labelName: 'Name', valueLabel: 'clientName' },
    { labelName: 'Email', valueLabel: 'clientEmail' },
    { labelName: 'Dishes', valueLabel: 'dishes' },
  ];

  constructor(
    private dataManagementService: DataManagementService<IOrders>,
    private orderService: getOrderService,
    private modalService: ModalService,
    private deleteModalService: ModalDeleteService
  ) {
    this.orderData = this.dataManagementService.data$;
  }

  modalTitle = 'Edit Order';

  ngOnInit() {
    this.orderService.getData().subscribe();

    this.orderToDeleteSubscription = this.orderService
      .getDishToDelete()
      .subscribe((order) => {
        this.orderToDelete = order;
      });
  }

  abrirModalEditar() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  openDeleteModal(order: IOrders) {
    this.deleteModalService.openModal();
    this.orderService.setDishToDelete(order);
  }

  onSave(): void {
    if (this.orderForm.valid) {
      const payload = {
        clientName: this.orderForm.get('clientName')?.value ?? '',
        clientEmail: this.orderForm.get('clientEmail')?.value ?? '',
        dishes: [{ name: this.orderForm.get('dishes')?.value ?? '' }],
      };

      this.inputService
        .postData(payload as unknown as IOrders)
        .pipe(tap((result) => console.log(result)))
        .subscribe();
    }
  
  }

  deleteData() {
    if (this.orderToDelete) {
      this.orderService.deleteData(this.orderToDelete.id).subscribe({
        next: () => {
          this.deleteModalService.closeModal();
          console.log('Deleted successfully');
        },
        error: (error) => {
          console.error('Delete failed', error);
        },
      });
    }
  }
}
