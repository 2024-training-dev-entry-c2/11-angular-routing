import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMenu } from '../../interfaces/menu.interface';
import { IDish } from '../../interfaces/dish.interface';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
})
export class MenuModalComponent implements OnInit {
  @Input() menu: IMenu | null = null; // Menú para editar
  @Input() dishes: IDish[] = []; // Lista de platos disponibles
  @Output() save = new EventEmitter<IMenu>();
  @Output() cancel = new EventEmitter<void>();

  menuForm!: FormGroup;
  selectedDishes: IDish[] = []; // Platos seleccionados

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.menuForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    if (this.menu) {
      this.menuForm.patchValue(this.menu);
      this.selectedDishes = [...this.menu.dishes];
    }
  }

  onDishToggle(dish: IDish, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedDishes.push(dish);
    } else {
      this.selectedDishes = this.selectedDishes.filter((d) => d.id !== dish.id);
    }
  }

  isDishSelected(dish: IDish): boolean {
    return this.selectedDishes.some((d) => d.id === dish.id);
  }

  onSave(): void {
    if (this.menuForm.valid) {
      const menuData: IMenu = {
        ...this.menuForm.value,
        dishes: this.selectedDishes,
      };
      this.save.emit(menuData);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
