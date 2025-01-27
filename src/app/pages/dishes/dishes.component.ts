import { Component, inject } from '@angular/core';
import { CreateService } from '../../services/create.service';
import { GetAllService } from '../../services/get-all.service';
import { DeleteService } from '../../services/delete.service';
import { UpdateService } from '../../services/update.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Env } from '../../env';
import { IValidator } from '../../interfaces/validator.interface';
import { IResponse } from '../../interfaces/response.interface';
import { tap } from 'rxjs';
import { IResponseDishes, ISendDish } from '../../interfaces/dish.interface';
import { TableComponent } from '../../components/table/table.component';
import { FormComponent } from '../../components/form/form.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-dishes',
  imports: [TableComponent, FormComponent, ModalComponent],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.scss'
})
export class DishesComponent {
   private createDishes = inject(CreateService);
    private getDishes = inject(GetAllService);
    private deleteDishes = inject(DeleteService);
    private updateDishes = inject(UpdateService);
    private formBuilder = inject(FormBuilder);
  
    public url = Env.API_URL + '/dishes';
  
    public message: string = '';
    public title: string = '';
    public action: string = '';

    public menus: { id: number; name: string }[] = [];
    
    public dishes: IResponseDishes[] = [];
    public columns = [
      { field: 'name', header: 'Nombre' },
      { field: 'menuName', header: 'Pertenece al Menú' },
      { field: 'description', header: 'Descripción' },
      { field: 'price', header: 'Precio' },
      { field: 'dishType', header: 'Tipo de Plato' },
    ]
  
    public isModalOpen: boolean = false;
  
    openModal(event: boolean) {
      this.isModalOpen = event;
    }
  
    public form: FormGroup = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      menu: [null, [Validators.required]],
    });
  
    public controls: IValidator[] = [
      {text: 'Nombre del Plato', type: 'input', inputType: "text", controlName: 'name', placeholder: 'Huevos con jamón'},
      {text: 'Descripción', type: 'textarea', inputType: "text", controlName: 'description', placeholder: 'Huevos cocidos con jamón serrano'},
      {text: 'Precio', type: 'input', inputType: "number", controlName: 'price', placeholder: '10'},
      {text: 'Menu', type: 'select', inputType: "text", controlName: 'menu', placeholder: 'Selecciona un Menú', options: []},
    ];
  
    
    ngOnInit(): void {
      this.submit();
      this.getAllDishes();
      this.getMenus(); 
    }
  
    create() {
      this.action = 'Crear';
      this.title = 'Crear Plato';
    
      if (this.form.valid) {
        const dishData: ISendDish = {
          name: this.form.value.name,
          description: this.form.value.description,
          price: this.form.value.price,
          menuId: parseInt(this.form.value.menu, 10),
        };
    
        this.createDishes.execute<IResponse>(this.url, dishData)
          .pipe(
            tap(result => {
              this.message = 'Plato creado correctamente';
              this.getAllDishes();
    
              setTimeout(() => {
                this.form.reset();
                this.message = '';
                this.isModalOpen = false;
              }, 1500);
            })
          )
          .subscribe(console.log);
      }
    }
    
  
    getMenus(): void {
      const menuUrl = Env.API_URL + '/menus'; 
      this.getDishes.execute<{ id: number; name: string }[]>(menuUrl)
        .pipe(
          tap(result => {
            this.menus = result; 
            const menuControl = this.controls.find(c => c.controlName === 'menu' && c.type === 'select');
            if (menuControl) {
              menuControl.options = this.menus.map(menu => ({
                value: String(menu.id), 
                label: menu.name 
              }));
            }
          })
        )
        .subscribe(console.log);
    }
    
    getAllDishes(): void {
      this.getDishes.execute<IResponseDishes[]>(this.url)
      .pipe(
        tap(result => this.dishes = result)
      ).subscribe(console.log);
    }
  
    updateById(dishId: number): void {
      this.message = '';
      this.action = 'Actualizar';
      this.title = 'Actualizar Plato';
    
      const dish = this.dishes.find(dish => dish.id === dishId); 
    
      this.form.patchValue({
        id: dishId, 
        name: dish?.name, 
        description: dish?.description, 
        price: dish?.price,
        menu: dish?.menuId, 
      });
    
      this.isModalOpen = true; 
    }
    
  
    update(dishId: number): void {
      if (this.form.valid) {
        const updatedDish: ISendDish = {
          name: this.form.value.name,
          description: this.form.value.description,
          price: this.form.value.price,
          menuId: parseInt(this.form.value.menu, 10),
        };
    
        this.updateDishes.execute<IResponse>(`${this.url}/${dishId}`, updatedDish)
          .pipe(
            tap(result => {
              this.message = 'Plato actualizado correctamente'; 
              this.getAllDishes();
    
              setTimeout(() => {
                this.form.reset();
                this.message = '';
                this.isModalOpen = false;
              }, 1000);
            })
          )
          .subscribe(console.log);
      }
    }
    
  
    submit(): void {
      if (this.form.value.id === null) {
        this.create();
      } else {
        this.update(this.form.value.id);
      }
    }
  
    deleteById(dishId: number): void {
      this.deleteDishes.execute<IResponse>(this.url + "/" + dishId)
        .pipe(
          tap(result => this.getAllDishes())
        ).subscribe();
    }
}
