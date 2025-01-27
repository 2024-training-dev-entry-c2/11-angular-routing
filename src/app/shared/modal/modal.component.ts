import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormComponent } from '../form/form.component';
import { IFormConfig } from '../../interfaces/client/fields';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule, MatIconModule, FormComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() formConfig!: IFormConfig;
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
