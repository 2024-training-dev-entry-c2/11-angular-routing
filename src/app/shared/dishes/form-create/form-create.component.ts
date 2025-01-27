import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DishesComponent } from '../../../pages/dishes/dishes.component';
import { Idish } from '../../../interfaces/dish/dish';

@Component({
  selector: 'app-form-create',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './form-create.component.html',
  styleUrl: './form-create.component.scss',
})
export class FormCreateComponent {
  @Input() isOpenForm = false;
  @Output() closeModalForm = new EventEmitter<void>();
  public plato!: Idish;
  editForm!: FormGroup;

  constructor(private fb: FormBuilder, private dish: DishesComponent) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.editForm.value);

    if (this.editForm.valid) {
      // this.plato = {
      //   name: this.editForm.value.name,
      //   description: this.editForm.value.description,
      //   price: this.editForm.value.price,
      //   isPopular: false,
      // };
      this.dish.createDish(this.editForm.value);
      console.log('Crear plato se creooo');
      this.close();
    }
  }

  close() {
    this.editForm.reset();
    this.closeModalForm.emit();
  }
}
