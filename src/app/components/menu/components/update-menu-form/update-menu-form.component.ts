import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateMenu } from '@interfaces/create-menu.interface';
import { IInput } from '@interfaces/input.interface';
import { MenuService } from '@services/menu/menu.service';
import { InputComponent } from '@shared/input/input.component';

@Component({
  selector: 'app-update-menu-form',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './update-menu-form.component.html',
  styleUrl: './update-menu-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateMenuFormComponent implements OnInit {

    menuService = inject(MenuService);
    formBuilder = inject(FormBuilder);
    menuId : number = 0;
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => this.menuId = params['id']);

    }

    updateMenuForm = this.formBuilder.group({
      menu_name: [''],
      menu_schedule: [''],
    });

    onSubmit(){

      if(this.updateMenuForm.valid){
        const body: ICreateMenu = {
          ...this.updateMenuForm.value as unknown as ICreateMenu
        }
        this.menuService.update(this.menuId, body).subscribe({
          next: () => {
            this.menuService.menuObserver.next(true);
            alert('Menu actualizado con exito');
          },
          error: () => {
            alert('Error al actualizar el menu');
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
          placeholder: 'Festa pizza',
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

 }
