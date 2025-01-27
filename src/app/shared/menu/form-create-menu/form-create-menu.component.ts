import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from '../../../pages/menu/menu.component';
import { DishService } from '../../../core/services/dish.service';
import { Idish } from '../../../interfaces/dish/dish';
import { Imenu, ImenuAlternativo } from '../../../interfaces/menu/menu';

@Component({
  selector: 'app-form-create-menu',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './form-create-menu.component.html',
  styleUrl: './form-create-menu.component.scss',
})
export class FormCreateMenuComponent {
  @Input() isOpenFormMenu = false;
  @Output() closeModalFormMenu = new EventEmitter<void>();
  public platos: Idish[] = [];
  public menuPlantilla!: ImenuAlternativo;

  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private menu: MenuComponent,
    private dish: DishService
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
    this.menuPlantilla = {
      name: this.editForm.value.name,
      description: this.editForm.value.description,
      dishIds: this.editForm.value.dishIds,
      restaurantId: 5,
    };
    if (this.editForm.valid) {
      this.menu.createMenu(this.menuPlantilla);
      console.log('Menu creado con exito');
      this.close();
    }
  }

  close() {
    this.editForm.reset();
    this.closeModalFormMenu.emit();
  }
}
