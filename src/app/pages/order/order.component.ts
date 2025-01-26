import { Component, inject } from '@angular/core';
import { FormComponent } from "../../components/form/form.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { TableComponent } from "../../components/table/table.component";
import { CreateService } from '../../services/create.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Env } from '../../env';
import { IResponseOrders, ISendOrder } from '../../interfaces/order.interface';
import { IResponse } from '../../interfaces/response.interface';
import { IValidator } from '../../interfaces/validator.interface';
import { DeleteService } from '../../services/delete.service';
import { GetAllService } from '../../services/get-all.service';
import { UpdateService } from '../../services/update.service';

@Component({
  selector: 'app-order',
  imports: [FormComponent, ModalComponent, TableComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
   private createOrders = inject(CreateService);
    private getOrders = inject(GetAllService);
    private deleteOrders = inject(DeleteService);
    private updateOrders = inject(UpdateService);
    private formBuilder = inject(FormBuilder);
  
    public url = Env.API_URL + '/orders';
  
    public message: string = '';
    public title: string = '';
    public action: string = '';
    
    public clients: { id: number; name: string }[] = [];
    public dishes: { id: number; name: string }[] = [];

    public users: IResponseOrders[] = [];
    public columns = [
      { field: 'id', header: 'Orden N#' }, 
      { field: 'client.name', header: 'Nombre del Cliente' }, 
      { field: 'dishes', header: 'Platos Comprados' }, 
      { field: 'totalPrice', header: 'Precio Total' }, 
    ];
    
  
    public isModalOpen: boolean = false;
  
    openModal(event: boolean) {
      this.isModalOpen = event;
    }
  
    public form: FormGroup = this.formBuilder.group({
      client: [null, [Validators.required]], 
      dishes: [[], [Validators.required]],
    });
    
    public controls: IValidator[] = [
      { text: 'Cliente', type: 'select', controlName: 'client', placeholder: 'Seleccionar Cliente', isMultiline: false, options: [] },
      { text: 'Platos', type: 'multiselect', controlName: 'dishes', placeholder: 'Seleccionar Platos', isMultiline: false, options: [] },
    ];
    
    ngOnInit(): void {
      this.submit();
      this.getAllOrders();
      this.getClients();
      this.getDishes();
    }
    create() {
      this.action = 'Crear';
      this.title = 'Crear Orden';
    
      if (this.form.valid) {
        const orderData: ISendOrder = {
          clientId: parseInt(this.form.value.client, 10), 
          dishIds: this.form.value.dishes.map((dishId: string) => parseInt(dishId, 10)), 
        };
    
        this.createOrders.execute<IResponse>(this.url, orderData)
          .pipe(
            tap(result => {
              this.message = 'Orden creada correctamente';
              this.getAllOrders();
    
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

    getClients(): void {
      const clientUrl = Env.API_URL + '/clients';
      this.getOrders.execute<{ id: number; name: string }[]>(clientUrl)
        .pipe(
          tap(result => {
            this.clients = result;
            const clientControl = this.controls.find(c => c.controlName === 'client' && c.type === 'select');
            if (clientControl) {
              clientControl.options = this.clients.map(client => ({
                value: String(client.id),
                label: client.name,
              }));
            }
          })
        )
        .subscribe(console.log);
    }
    
    getDishes(): void {
      const dishUrl = Env.API_URL + '/dishes';
      this.getOrders.execute<{ id: number; name: string }[]>(dishUrl)
        .pipe(
          tap(result => {
            this.dishes = result;
            const dishControl = this.controls.find(c => c.controlName === 'dishes' && c.type === 'multiselect');
            if (dishControl) {
              dishControl.options = this.dishes.map(dish => ({
                value: String(dish.id),
                label: dish.name,
              }));
            }
          })
        )
        .subscribe(console.log);
    }
  

    
    
    getAllOrders(): void {
      this.getOrders.execute<IResponseOrders[]>(this.url)
      .pipe(
        tap(result => this.users = result)
      ).subscribe(console.log);
    }
  
    updateById(orderId: number): void {
      this.message = '';
      this.action = 'Actualizar';
      this.title = 'Actualizar Orden';
    
      const order = this.users.find(user => user.id === orderId);
    
      this.form.patchValue({
        client: String(order?.client.id), 
        dishes: order?.dishes.map(dish => String(dish.id)), 
      });
    
      this.isModalOpen = true;
    }
    
    
  
    update(dishId: number): void {
      if (this.form.valid) {
        const updatedDish: ISendOrder = {
          dishIds: this.form.value.dishes.map((dishId: string) => parseInt(dishId, 10)),
          clientId: parseInt(this.form.value.client, 10),
        };
    
        this.updateOrders.execute<IResponse>(`${this.url}/${dishId}`, updatedDish)
          .pipe(
            tap(result => {
              this.message = 'Orden actualizada correctamente'; 
              this.getAllOrders();
    
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
    
  
    submit(): void {
      if (this.form.value.id === null) {
        this.create();
      } else {
        this.update(this.form.value.id);
      }
    }
  
    deleteById(dishId: number): void {
      this.deleteOrders.execute<IResponse>(this.url + "/" + dishId)
        .pipe(
          tap(result => this.getAllOrders())
        ).subscribe();
    }
}
