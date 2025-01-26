import { CommonModule, CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { IOrders } from '../../interface/orders.interface';
import { getClientsService } from '../../services/clients.service';
import { getOrderService } from '../../services/orders.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DataManagementService } from '../../services/data.service';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalActionDeleteComponent } from '../modal-action-delete/modal-action-delete.component';
import { ModalDeleteService } from '../../services/modal-delete.service';
import { ModalActionEditComponent } from '../modal-action-edit/modal-action-edit.component';
import { IMenu } from '../../interface/menus.interface';
import { ModalEditService } from '../../services/modal-edit.service';

@Component({
  selector: 'app-main-section-orders',
  imports: [
    DatePipe,
    CurrencyPipe,
    CommonModule,
    ModalComponent,
    ModalActionDeleteComponent,
    ModalActionEditComponent,
  
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
  private orderToEditSubscription!: Subscription;
  private orderToEdit: IOrders | null = null;
  onSaveTest = output<void>();
  dishForm = false;

  public orderForm = this.formBuilder.group({
    clientName: ['', [Validators.required, Validators.minLength(3)]],
    clientEmail: ['', [Validators.required, Validators.email]],
    dishesText: ['', Validators.required],
  });

  get dishesText() {
    return this.orderForm.get('dishesText');
  }

  formData = [
    { labelName: 'Name', valueLabel: 'clientName' },
    { labelName: 'Email', valueLabel: 'clientEmail' },
    { labelName: 'Dishes', valueLabel: 'dishesText' },
  ];

  constructor(
    private dataManagementService: DataManagementService<IOrders>,
    private orderService: getOrderService,
    private modalService: ModalService,
    private deleteModalService: ModalDeleteService,
    private editModalService: ModalEditService
  ) {
    this.orderData = this.dataManagementService.data$;
  }

  modalTitle = 'Edit Order';

  ngOnInit() {
    this.orderService.getData().subscribe();

    this.orderToDeleteSubscription = this.orderService
      .getOrderToDelete()
      .subscribe((order) => {
        this.orderToDelete = order;
      });

    this.orderToEditSubscription = this.orderService
      .getOrderToEdit()
      .subscribe((orderEdit) => {
        this.orderToEdit = orderEdit;
      });
  }

  openAddModal() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  openDeleteModal(order: IOrders) {
    this.deleteModalService.openModal();
    this.orderService.setOrderToDelete(order);
  }


  openEditModal(orderEdit: IOrders) {
    const dishesText = orderEdit.dishes.map(dish => dish.name).join(', ');
  
    this.orderForm.patchValue({
      clientName: orderEdit.clientName,
      clientEmail: orderEdit.clientEmail,
      dishesText: dishesText,
    });
  
    this.editModalService.openModal();
    this.orderService.setOrderToEdit(orderEdit);
  }
  
  onSave(): void {
    if (this.orderForm.valid) {
      const dishesText = this.dishesText?.value ?? '';
      const dishesArray = dishesText
        .split(',')
        .filter(dish => dish.trim() !== '')
        .map(dish => ({ name: dish.trim() })); 
  
      const payload = {
        clientName: this.orderForm.get('clientName')?.value ?? '',
        clientEmail: this.orderForm.get('clientEmail')?.value ?? '',
        dishes: dishesArray, 
      };
  
      console.log('Payload:', payload); 
  
      this.inputService
        .postData(payload as unknown as IOrders)
        .pipe(tap((result) => console.log('Result:', result)))
        .subscribe(() => {
          this.closeModal();
        });
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

  onSaveEdit(): void {
    if (this.orderToEdit && this.orderForm.valid) {
      const dishesText = this.dishesText?.value ?? '';
      const dishesArray = dishesText
        .split(',')
        .filter(dish => dish.trim() !== '')
        .map(dish => ({ name: dish.trim() })); 
  
      const payload = {
        clientName: this.orderForm.get('clientName')?.value ?? '',
        clientEmail: this.orderForm.get('clientEmail')?.value ?? '',
        dishes: dishesArray, 
      };
  
      // console.log('Edit Payload:', payload); 
  
      this.orderService
        .editData(this.orderToEdit.id, payload as unknown as IOrders)
        .subscribe({
          next: () => {
            this.editModalService.closeModal();
            this.orderForm.reset();
          },
          error: (error) => {
            console.error('Edit failed', error);
          },
        });
    }
  }
  
}