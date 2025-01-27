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
import { CreateDishService } from '../../services/create-dish.service';
import { IDish, IDishResponse } from '../../interfaces/dish.interface';
import { UpdateDishService } from '../../services/update-dish.service';

@Component({
  selector: 'app-form-dish',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormGroupComponent,
    FontAwesomeModule,
  ],
  templateUrl: './form-dish.component.html',
  styleUrl: './form-dish.component.scss',
})
export class FormDishComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private createDishService = inject(CreateDishService);
  private updateDishService = inject(UpdateDishService);

  @Input() public selectedDish: IDishResponse | null = null;
  @Input() public menuId!: number;

  @Output() public closeModal = new EventEmitter<void>();
  @Output() public dishSaved = new EventEmitter<IDishResponse>();
  @Output() public dishUpdated = new EventEmitter<IDishResponse>();
  @Output() public clearSelected = new EventEmitter<void>();

  isSubmitted = false;
  faX = faX;

  dishForm?: FormGroup;

  ngOnInit(): void {
    if (this.selectedDish) {
      this.dishForm = this.formBuilder.group({
        dishName: [this.selectedDish.dishName, Validators.required],
        description: [this.selectedDish.description, Validators.required],
        basePrice: [this.selectedDish.basePrice, Validators.required],
        isPopular: this.selectedDish.isPopular,
        menuId: this.menuId,
        active: this.selectedDish.active,
      });
    } else {
      this.dishForm = this.formBuilder.group({
        dishName: ['', Validators.required],
        description: ['', Validators.required],
        basePrice: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        isPopular: false,
        menuId: this.menuId,
        active: true,
      });
    }
  }

  get dishNameControl(): FormControl {
    return this.dishForm!.get('dishName') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.dishForm!.get('description') as FormControl;
  }

  get basePriceControl(): FormControl {
    return this.dishForm!.get('basePrice') as FormControl;
  }

  close(): void {
    this.clearSelected.emit();
    this.closeModal.emit();
  }

  saveDish(event: Event): void {
    event.preventDefault();
    if (!this.dishForm!.valid) {
      this.isSubmitted = true;
      return;
    }
    if (this.selectedDish) {
      this.updateDishService
        .execute(
          this.selectedDish.id,
          this.dishForm!.getRawValue() as unknown as IDish
        )
        .subscribe((updatedDish) => {
          this.dishUpdated.emit(updatedDish);
          this.closeModal.emit();
        });
    } else {
      this.createDishService
        .execute(this.dishForm!.getRawValue() as unknown as IDish)
        .subscribe((newDish) => {
          this.dishSaved.emit(newDish);
          this.closeModal.emit();
        });
    }
  }
}
