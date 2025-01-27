import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  ICreateCustomerRequest,
  ICustomerResponse,
} from '../../../services/customer/interfaces/customer-interface';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';

@Component({
  selector: 'app-customer-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputFieldComponent],
  templateUrl: './customer-form-modal.component.html',
  styleUrls: ['./customer-form-modal.component.scss'],
})
export class CustomerFormModalComponent implements OnChanges {
  @Input() initialValues?: ICustomerResponse;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<ICreateCustomerRequest>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValues'] && this.initialValues) {
      this.form.patchValue({
        name: this.initialValues.name,
        lastName: this.initialValues.lastName,
        email: this.initialValues.email,
        phone: this.initialValues.phone,
      });
    }
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.form.valid) {
      const newCustomer: ICreateCustomerRequest = {
        name: this.form.value.name,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        phone: this.form.value.phone,
      };
      this.submit.emit(newCustomer);
      this.form.reset();
      this.onClose();
    }
  }

  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.form.get('lastName') as FormControl;
  }

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get phoneControl(): FormControl {
    return this.form.get('phone') as FormControl;
  }
}
