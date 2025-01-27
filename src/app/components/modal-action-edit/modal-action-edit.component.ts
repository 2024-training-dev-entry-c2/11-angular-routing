import { Component, Input, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { ModalEditService } from '../../services/modal-edit.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-modal-action-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-action-edit.component.html',
  styleUrl: './modal-action-edit.component.scss'
})
export class ModalActionEditComponent {
 private subscription!: Subscription;
  modalTitle = input<string>('');
  save = output<void>();
  onSaveTest = output<void>();
  inputForm = input<FormGroup>();
  isOpen = false;
  formData = input<any[]>();
  labelName = input<string>('');
  valueLabel = input<string>('');
  @Input() saveAction?: () => void;
  dishForm = input<any>();

  constructor(private modalService: ModalEditService) {}

  ngOnInit() {
    this.subscription = this.modalService.modalState$.subscribe(
      (state) => (this.isOpen = state)
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  closeModal() {
    this.modalService.closeModal();
  }

  saveData() {
    if (this.saveAction) {
      this.saveAction();
      this.closeModal();
    }
  }

  
}
