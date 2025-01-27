import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DishService } from '../../../core/services/dish.service';
import { Idish } from '../../../interfaces/dish/dish';
import { MenuComponent } from '../../../pages/menu/menu.component';
import { Dish, Imenu } from '../../../interfaces/menu/menu';

@Component({
  selector: 'app-form-create-update',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './form-create-update.component.html',
  styleUrl: './form-create-update.component.scss',
})
export class FormCreateUpdateComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Input() menuId!: number;
  public platos: Idish[] = [];
  public menuPlantilla!: { name: string; description: string; dishIds: Dish[]; restaurantId?: number; };

  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dish: DishService,
    private menus: MenuComponent
  ) {}

  ngOnInit() {
    this.initForm();
    this.dish.dishes.subscribe((dishes) => (this.platos = dishes));
  }

  private initForm(): void {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      dishIds: [[], Validators.required],
    });
  }

  onSubmit() {
    console.log(this.editForm.value);
    console.log(this.editForm.value.dishIds);
    this.menuPlantilla = {
      name: this.editForm.value.name,
      description: this.editForm.value.description,
      dishIds: this.editForm.value.dishIds,
    };
    if (this.editForm.valid) {
      this.menus.editMenu(this.menuId, this.menuPlantilla);
      console.log('Se actualizo el menú');
      this.close();
    }
  }

  close() {
    this.editForm.reset();
    this.closeModal.emit();
  }
}
