import {
  Component,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import {
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  modalTitle = input<string>('');
  save = output<void>();
  onSaveTest = output<void>();
  inputForm = input<FormGroup>();
  isOpen = false;
  formData = input<any[]>();
  labelName = input<string>('');
  valueLabel = input<string>('');

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.subscription = this.modalService.modalState$.subscribe(
      (state) => (this.isOpen = state)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveData() {
    this.onSaveTest.emit();
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
