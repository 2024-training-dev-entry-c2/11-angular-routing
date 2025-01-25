import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { IClients } from '../../interface/clients.interface';
import { DataManagementService } from '../../services/data.service';
import { getClientsService } from '../../services/clients.service';
import { Observable, tap } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-section-clients',
  imports: [CommonModule, ModalComponent],
  templateUrl: './main-section-clients.component.html',
  styleUrl: './main-section-clients.component.scss',
})
export class MainSectionClientsComponent {
  public data: any;
  public userData: Observable<IClients[]>;
  public tableContent = input<string[]>();
  private inputService = inject(getClientsService);
  private formBuilder = inject(FormBuilder);

  formData = [
    { labelName: 'Name', valueLabel: 'name' },
    { labelName: 'Email', valueLabel: 'email' },
  ];

  constructor(
    private dataManagementService: DataManagementService<IClients>,
    private clientsService: getClientsService,
    private modalService: ModalService
  ) {
    this.userData = this.dataManagementService.data$;
  }

  modalTitle = 'Editar Cliente';
  clientName = '';

  ngOnInit() {
    this.clientsService.getData().subscribe();
  }

  abrirModalEditar() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  public clientForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  onSave(): void {
    if (this.clientForm.valid) {
      this.inputService
        .postData(this.clientForm.value as unknown as IClients)
        .pipe(tap((result) => console.log(result)))
        .subscribe();
    }
    this.closeModal();
  }
}
