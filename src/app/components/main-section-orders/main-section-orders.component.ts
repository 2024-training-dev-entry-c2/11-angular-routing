import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IOrders } from '../../interface/orders.interface';
import { getClientsService } from '../../services/clients.service';
import { getOrderService } from '../../services/orders.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DataManagementService } from '../../services/data.service';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-main-section-orders',
  imports: [DatePipe, CurrencyPipe, CommonModule, ModalComponent],
  templateUrl: './main-section-orders.component.html',
  styleUrl: './main-section-orders.component.scss'
})
export class MainSectionOrdersComponent {
  modalTitle = '';
 public data: any;
  public orderData: Observable<IOrders[]>;
  public tableContent= input<string[]>();
  private inputService = inject(getOrderService);
  private formBuilder = inject(FormBuilder);

  formData = [
    { labelName: 'Name', valueLabel: 'name', type: 'text' },
    { labelName: 'Email', valueLabel: 'email', type: 'email' },
    { labelName: 'Dishes', valueLabel: 'dishes', type: 'text' },
  ];

  constructor(
      private dataManagementService: DataManagementService<IOrders>,
      private orderService: getOrderService,
      private modalService: ModalService
    ) {
      this.orderData = this.dataManagementService.data$;
    }



    ngOnInit() {
        this.orderService.getData().subscribe();
      }
    
      abrirModalEditar() {
        this.modalService.openModal();
      }
    
      closeModal() {
        this.modalService.closeModal();
      }
    
      public orderForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        dish: ['', [Validators.required]],
      });
    
      onSave(): void {
        if (this.orderForm.valid) {
          this.inputService
            .postData(this.orderForm.value as unknown as IOrders)
            .pipe(tap((result) => console.log(result)))
            .subscribe();
        }
        this.closeModal();
      }
    }

