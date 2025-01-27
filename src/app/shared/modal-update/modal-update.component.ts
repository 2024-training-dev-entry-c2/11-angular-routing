import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormUpdateComponent } from '../form-update/form-update.component';
import { IFormConfig } from '../../interfaces/client/fields';

@Component({
  selector: 'app-modal-update',
  imports: [MatIconModule, FormUpdateComponent],
  templateUrl: './modal-update.component.html',
  styleUrl: './modal-update.component.scss',
})
export class ModalUpdateComponent {
  @Input() formConfig!: IFormConfig;
  @Input() id: number = 0;
  @Input() data:
    | { name: string; email: string; phone: number; address: string }
    | undefined;
  @Input() dataDsh:
    | { name: string; description: string; price: number }
    | undefined;

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
