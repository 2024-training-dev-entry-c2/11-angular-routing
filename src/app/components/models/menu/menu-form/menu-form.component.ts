import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditMenuService } from '../../../../services/menu/edit-menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddMenuService } from '../../../../services/menu/add-menu.service';
import { DynamicInputComponent } from 'src/app/components/custom/dynamic-input/dynamuc-input.component';

@Component({
  selector: 'app-menu-form',
  imports: [ReactiveFormsModule ,CommonModule, DynamicInputComponent],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.scss'
})
export class MenuFormComponent implements OnInit {
  menuForm: FormGroup;
  private editMenuService = inject(EditMenuService);
  private addMenuService = inject(AddMenuService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected menuId: number | null = null
  isLoading = true;
  isEditing = false;

  menuConfig = {
    name: 'name',
    label: 'Nombre del Menú',
    type: 'text',
    placeholder: 'Escribe el nuevo nombre',
    required: true
  };

  constructor(private fb: FormBuilder) {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.menuId = +id;
        this.isEditing = true; 
        this.menuData(this.menuId);
      } else {
        this.isLoading = false;
      }
    });
  }
  
  menuData(id: number): void {
    this.editMenuService.getMenu(id).subscribe({
      next: (menu) => {
        this.menuForm.patchValue(menu); 
        this.isLoading = false; 
      },
      error: (err) => {
        console.error('Error al cargar los datos del menú:', err);
        this.isLoading = false; 
      },
    })
  }

  submit(): void {
    if (this.menuForm.valid) {
      const menuData = this.menuForm.value;

      if (this.isEditing && this.menuId) {
        this.editMenuService.updateMenu(this.menuId, menuData).subscribe({
          next: () => {
            this.router.navigate(['/menus']);
          },
          error: (err) => {
            console.error('Error al actualizar el menú:', err);
          },
        });
      } else {
        this.addMenuService.execute(menuData).subscribe({
          next: () => {
            this.router.navigate(['/menus']);
          },
          error: (err) => {
            console.error('Error al crear el menú:', err);
          },
        });
      }
    } else {
      console.error('Formulario inválido');
    }
  }
}

