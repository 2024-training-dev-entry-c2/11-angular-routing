import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IClient } from '../../interfaces/client.interface';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ClientModalComponent implements OnInit {
  @Input() client: IClient | null = null;
  @Output() save = new EventEmitter<IClient>();
  @Output() cancel = new EventEmitter<void>();

  clientForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      type: [''],
    });

    if (this.client) {
      this.clientForm.patchValue(this.client);
    }
  }

  onSave(): void {
    if (this.clientForm.valid) {
      this.save.emit(this.clientForm.value);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}