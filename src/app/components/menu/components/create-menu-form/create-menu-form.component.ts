import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateMenu } from '@interfaces/create-menu.interface';
import { IInput } from '@interfaces/input.interface';
import { MenuService } from '@services/menu/menu.service';
import { InputComponent } from '@shared/input/input.component';

@Component({
  selector: 'app-create-menu-form',
  imports: [ReactiveFormsModule, CommonModule, InputComponent],
  templateUrl: './create-menu-form.component.html',
  styleUrl: './create-menu-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMenuFormComponent {

  menuService = inject(MenuService);
  formBuilder = inject(FormBuilder);

  router = inject(Router);

  menuForm = this.formBuilder.group({
    menu_name: [''],
    menu_schedule: [''],
    menu_dishes: this.formBuilder.group({
      dish_name: [''],
      dish_price: ['']
    })
  });

  onSubmit() {
    if (this.menuForm.valid) {
      const body: ICreateMenu = {
        menu_name: this.menuForm.value.menu_name as unknown as string,
        menu_schedule: this.menuForm.value.menu_schedule as unknown as string,
        menu_dishes: [{
          dish_name: this.menuForm.value.menu_dishes!.dish_name as unknown as string,
          dish_price: this.menuForm.value.menu_dishes!.dish_price as unknown as string
        }]
      }
      
      this.menuService.create(body).subscribe({
        next: () => {
          alert('Menu creado con exito');
        },
        error: () => {
          alert('Error al crear el menu');
        },
        complete: () => {
          this.router.navigate([`/dashboard/menu/view`]);
        }
      });
    }
  }


  inputs: IInput[] = [
        {
          aria: 'menu_name',
          control: 'menu_name',
          name: 'menu_name',
          placeholder: 'Fiesta pizza',
          title: 'Nombre',
          type: 'text',
        },
        {
          aria: 'menu_schedule',
          control: 'menu_schedule',
          name: 'menu_schedule',
          placeholder: 'Lunes, Miercoles',
          title: 'Programacion',
          type: 'text',
        },
    ];
  dishes: IInput[] = [
        {
          aria: 'dish_name',
          control: 'dish_name',
          name: 'dish_name',
          placeholder: 'Pizza doble queso',
          title: 'Nombre',
          type: 'text',
        },
        {
          aria: 'dish_price',
          control: 'dish_price',
          name: 'dish_price',
          placeholder: '$ 56',
          title: 'Precio',
          type: 'text',
        },
    ];

}
