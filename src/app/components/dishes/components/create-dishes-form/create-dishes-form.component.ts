import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateDish } from '@interfaces/create-dish.interface';
import { IInput } from '@interfaces/input.interface';
import { DishesService } from '@services/dishes/dishes.service';
import { InputComponent } from '@shared/input/input.component';

@Component({
  selector: 'app-create-dishes-form',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './create-dishes-form.component.html',
  styleUrl: './create-dishes-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDishesFormComponent implements OnInit {

    dishesService = inject(DishesService)
    formBuilder = inject(FormBuilder);
    router = inject(Router);
    activeRoute = inject(ActivatedRoute);

    @Input({transform: booleanAttribute}) isUpdate: boolean = false;
    @Input() id?: number = 0;
    menu: number = 0;

    dishesForm = this.formBuilder.group({
      dish_name: [''],
      dish_price: [''],

    });
    inputs: IInput[] = [
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
          placeholder: '21',
          title: 'Precio',
          type: 'text',
        },
    ];

    ngOnInit(): void {
      this.activeRoute.params.subscribe(params => this.menu = params['menu']);
    }

    onSubmit(){
      if(this.dishesForm.valid){
        const body: ICreateDish = {
          ...this.dishesForm.value as unknown as ICreateDish
        }
        if(!this.isUpdate){
          this.dishesService.create(this.menu, body).subscribe({
            next: () => {
              alert('Plato creado con exito');
            },
            error: () => {
              alert('Error al crear el plato');
            },
            complete: () => {
              this.router.navigate([`/dashboard/menu/view`]);
            }
          });
        }else{
          this.dishesService.update(this.id as number, body).subscribe({
            next: () => {
              alert('Plato actualizado con exito');
            },
            error: () => {
              alert('Error al actualizar el plato');
            },
            complete: () => {
              this.router.navigate([`/dashboard/dishes/view`]);
            }
          });
        }
      }
    }
}
