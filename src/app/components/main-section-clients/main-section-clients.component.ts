import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { IClients } from '../../interface/clients.interface';
import { DataManagementService } from '../../services/data.service';
import { getClientsService } from '../../services/clients.service';
import { Observable, Subscription, tap } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalActionDeleteComponent } from '../modal-action-delete/modal-action-delete.component';
import { ModalDeleteService } from '../../services/modal-delete.service';

@Component({
  selector: 'app-main-section-clients',
  imports: [CommonModule, ModalComponent, ModalActionDeleteComponent],
  templateUrl: './main-section-clients.component.html',
  styleUrl: './main-section-clients.component.scss',
})
export class MainSectionClientsComponent {
  public data: any;
  public userData: Observable<IClients[]>;
  public tableContent = input<string[]>();
  private inputService = inject(getClientsService);
  private formBuilder = inject(FormBuilder);
  private subscription!: Subscription;
  private clientToDeleteSubscription!: Subscription;
  private clientToDelete: IClients | null = null;
  onSaveTest = output<void>();

  public clientForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  formData = [
    { labelName: 'Name', valueLabel: 'name' },
    { labelName: 'Email', valueLabel: 'email' },
  ];

  constructor(
    private dataManagementService: DataManagementService<IClients>,
    private clientsService: getClientsService,
    private modalService: ModalService,
    private deleteModalService: ModalDeleteService
    
  ) {
    this.userData = this.dataManagementService.data$;
  }


  ngOnInit() {
    this.clientsService.getData().subscribe();

    this.clientToDeleteSubscription = this.clientsService
      .getClientToDelete()
      .subscribe((client) => {
        this.clientToDelete = client;
      });
  }

  openAddModal() {
    this.modalService.openModal();
  }

  openDeleteModal(client: IClients) {
    this.deleteModalService.openModal();
    this.clientsService.setClientToDelete(client);
  }

  
  closeModal() {
    this.modalService.closeModal();
  }

 

  onSave(): void {
    if (this.clientForm.valid) {
      this.inputService
        .postData(this.clientForm.value as unknown as IClients)
        .pipe(tap((result) => console.log(result)))
        .subscribe();
    }
    this.closeModal();
  }

  deleteData() {
    if (this.clientToDelete) {
      this.clientsService.deleteData(this.clientToDelete.id).subscribe({
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
