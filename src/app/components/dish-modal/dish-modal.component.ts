import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDish } from '../../interfaces/dish.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish-modal',
  templateUrl: './dish-modal.component.html',
  styleUrls: ['./dish-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class DishModalComponent implements OnInit {
  @Input() dish: IDish | null = null;
  @Output() save = new EventEmitter<IDish>();
  @Output() cancel = new EventEmitter<void>();

  dishForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dishForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      type: ['', [Validators.required]],
    });

    if (this.dish) {
      this.dishForm.patchValue(this.dish);
    }
  }

  onSave(): void {
    if (this.dishForm.valid) {
      this.save.emit(this.dishForm.value);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
