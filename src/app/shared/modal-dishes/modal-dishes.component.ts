import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DishesComponent } from '../../pages/dishes/dishes.component';

@Component({
  selector: 'app-modal-dishes',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './modal-dishes.component.html',
  styleUrls: ['./modal-dishes.component.scss'],
})
export class ModalDishesComponent implements OnInit {
  @Input() isOpen = false;
  @Input() id = 0;
  @Output() closeModal = new EventEmitter<void>();
  @Input() data!: {
    id: number;
    name: string;
    description: string;
    price: number;
  };

  editForm!: FormGroup;

  constructor(private fb: FormBuilder, private dish: DishesComponent) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.editForm = this.fb.group({
      name: [this.data.name ? this.data.name : '', Validators.required],
      description: [
        this.data.description ? this.data.description : '',
        Validators.required,
      ],
      price: [this.data.price ? this.data.price : '', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.id);

    if (this.editForm.valid) {
      this.dish.editDish(this.id, this.editForm.value);
      console.log(this.editForm.value);
      this.close();
    }
  }

  close() {
    this.editForm.reset();
    this.closeModal.emit();
  }
}
