import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroupComponent } from '../../../form-group/components/form-group.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { CreateCustomerService } from '../../services/create-customer.service';
import {
  ICustomer,
  ICustomerResponse,
} from '../../interfaces/customer.interface';
import { UpdateCustomerService } from '../../services/update-customer.service';

@Component({
  selector: 'app-create-customer',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormGroupComponent,
    FontAwesomeModule,
  ],
  templateUrl: './form-customer.component.html',
  styleUrl: './form-customer.component.scss',
})
export class FormCustomerComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private createCustomerService = inject(CreateCustomerService);
  private updateCustomerService = inject(UpdateCustomerService);

  @Input() public selectedCustomer: ICustomerResponse | null = null;

  @Output() public closeModal = new EventEmitter<void>();
  @Output() public customerSaved = new EventEmitter<ICustomerResponse>();
  @Output() public customerUpdated = new EventEmitter<ICustomerResponse>();
  @Output() public clearSelected = new EventEmitter<void>();

  isSubmitted = false;
  faX = faX;

  customerForm?: FormGroup;

  ngOnInit(): void {
    if (this.selectedCustomer) {
      this.customerForm = this.formBuilder.group({
        name: [this.selectedCustomer.name, Validators.required],
        lastName: [this.selectedCustomer.lastName, Validators.required],
        email: [
          this.selectedCustomer.email,
          [Validators.required, Validators.email],
        ],
        phone: [
          this.selectedCustomer.phone,
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
        address: [this.selectedCustomer.address, Validators.required],
        isFrequent: this.selectedCustomer.isFrequent,
      });
    } else {
      this.customerForm = this.formBuilder.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        address: ['', Validators.required],
        isFrequent: false,
      });
    }
  }

  get nameControl(): FormControl {
    return this.customerForm!.get('name') as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.customerForm!.get('lastName') as FormControl;
  }

  get emailControl(): FormControl {
    return this.customerForm!.get('email') as FormControl;
  }

  get phoneControl(): FormControl {
    return this.customerForm!.get('phone') as FormControl;
  }

  get addressControl(): FormControl {
    return this.customerForm!.get('address') as FormControl;
  }

  close(): void {
    this.clearSelected.emit();
    this.closeModal.emit();
  }

  saveCustomer(event: Event): void {
    event.preventDefault();
    if (!this.customerForm!.valid) {
      this.isSubmitted = true;
      return;
    }
    if (this.selectedCustomer) {
      this.updateCustomerService
        .execute(
          this.selectedCustomer.id,
          this.customerForm!.getRawValue() as unknown as ICustomer
        )
        .subscribe((updatedCustomer) => {
          this.customerUpdated.emit(updatedCustomer);
          this.closeModal.emit();
        });
    } else {
      this.createCustomerService
        .execute(this.customerForm!.getRawValue() as unknown as ICustomer)
        .subscribe((newCustomer) => {
          this.customerSaved.emit(newCustomer);
          this.closeModal.emit();
        });
    }
  }
}
