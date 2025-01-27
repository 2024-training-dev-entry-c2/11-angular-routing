import { Component, inject } from '@angular/core';
import { FormComponent } from "../../components/form/form.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { TableComponent } from "../../components/table/table.component";
import { CreateService } from '../../services/create.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, finalize, tap } from 'rxjs';
import { Env } from '../../env';
import { IResponseOrders, ISendOrder } from '../../interfaces/order.interface';
import { IResponse } from '../../interfaces/response.interface';
import { IValidator } from '../../interfaces/validator.interface';
import { DeleteService } from '../../services/delete.service';
import { GetAllService } from '../../services/get-all.service';
import { UpdateService } from '../../services/update.service';
import { IResponseDishes } from '../../interfaces/dish.interface';
import { IResponseClients } from '../../interfaces/client.interface';

@Component({
  selector: 'app-order',
  imports: [FormComponent, ModalComponent, TableComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  private createOrders = inject(CreateService);
  private getOrders = inject(GetAllService);
  private getDishes = inject(GetAllService);
  private deleteOrders = inject(DeleteService);
  private updateOrders = inject(UpdateService);
  private formBuilder = inject(FormBuilder);
  
  public isEditing: boolean = false;
  public message: string = '';
  public title: string = '';
  public action: string = '';
  
  public url = Env.API_URL + '/orders';

  public clients: IResponseClients[] = [];
  public dishes: IResponseDishes[] = [];

  public users: IResponseOrders[] = [];
  public columns = [
    { field: 'id', header: 'Orden N#' }, 
    { field: 'client.name', header: 'Nombre del Cliente' }, 
    { field: 'client.lastName', header: 'Apellido del Cliente' },
    { field: 'orderDate', header: 'Fecha de la Orden' },
    { field: 'dishes', header: 'Platos Comprados' }, 
    { field: 'totalPrice', header: 'Precio Total' }, 
  ];
  

  public isModalOpen: boolean = false;

  openModal(event: boolean, orderId?: number): void {
    this.isModalOpen = event;
    this.isEditing = !!orderId;
  
    if (orderId) {
      this.action = 'Actualizar';
      this.title = 'Actualizar Orden';
      this.updateById(orderId); 
    } else {
      this.action = 'Crear';
      this.title = 'Crear Orden';
      this.form.reset();
    }
  }
  

  public form: FormGroup = this.formBuilder.group({
    client: [null, [Validators.required]], 
    dishes: [[], [Validators.required]],
  });
  
  public controls: IValidator[] = [
    { text: 'Cliente', type: 'select', controlName: 'client', placeholder: 'Seleccionar Cliente', options: [] },
    { text: 'Platos', type: 'multiselect', controlName: 'dishes', placeholder: 'Seleccionar Platos', options: [] },
  ];
  
  ngOnInit(): void {
    this.getAllOrders();
    this.getClients();
    this.getAllDishes();
  }
  
  create(): void {
    if (!this.form.valid) {
      this.message = 'Por favor, complete todos los campos obligatorios.';
      console.log('Formulario inválido:', this.form.value);
      return;
    }
  
    const payload: ISendOrder = {
      clientId: parseInt(this.form.value.client, 10),
      dishIds: this.form.value.dishes.map((dishId: string) => parseInt(dishId, 10)), 
    };
  
    console.log('Payload enviado al backend:', payload);
  
    this.createOrders.execute<IResponse>(this.url, payload)
      .pipe(
        tap(result => {
          this.message = 'Orden creada correctamente';
          this.getAllOrders(); 
        }),
        delay(2000),
        finalize(() => {
          this.form.reset();
          this.message = '';
          this.isModalOpen = false;
        })
      )
      .subscribe({
        next: res => console.log('Respuesta del backend:', res),
        error: err => console.error('Error al crear la orden:', err),
      });
  }
  
  

  getClients(): void {
    const clientUrl = Env.API_URL + '/clients';
    this.getOrders.execute<IResponseClients[]>(clientUrl)
      .pipe(
        tap(result => {
          console.log('Clientes obtenidos:', result);
          this.clients = result.map(client => ({
            ...client,
            clientType: client.clientType || 'Regular', 
          }));
  
          const clientControl = this.controls.find(c => c.controlName === 'client' && c.type === 'select');
          if (clientControl) {
            clientControl.options = this.clients.map(client => ({
              value: String(client.id),
              label: `${client.name} ${client.lastName || ''}`.trim(),
            }));
          }
        })
      )
      .subscribe({
        next: () => console.log('Clientes procesados correctamente.'),
        error: err => console.error('Error al cargar clientes:', err),
      });
  }
  
    
  
  getAllDishes(): void {
    const dishUrl = Env.API_URL + '/dishes';
    this.getDishes.execute<IResponseDishes[]>(dishUrl)
      .pipe(
        tap(result => {
          console.log('Platos obtenidos:', result);
          this.dishes = result;
          const dishControl = this.controls.find(c => c.controlName === 'dishes' && c.type === 'multiselect');
          if (dishControl) {
            dishControl.options = this.dishes.map(dish => ({
              value: String(dish.id),
              label: `${dish.name} - $${dish.price || ''}`.trim(),
            }));
          }
        })
      ).subscribe();
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
  
  update(orderId: number): void {
    if (!this.form.valid) {
      this.message = 'Por favor, complete todos los campos obligatorios.';
      return;
    }
  
    const payload: ISendOrder = {
      dishIds: this.form.value.dishes.map((dishId: string) => parseInt(dishId, 10)),
      clientId: parseInt(this.form.value.client, 10),
    };
  
    console.log('Actualizando orden con ID:', orderId);
    console.log('Payload enviado:', payload);
  
    this.updateOrders.execute<IResponse>(`${this.url}/${orderId}`, payload)
      .pipe(
        tap(result => {
          this.message = 'Orden actualizada correctamente'; 
          this.getAllOrders();
        }),
        finalize(() => {
          this.form.reset();
          this.message = '';
          this.isModalOpen = false;
        })
      )
      .subscribe({
        next: res => console.log('Respuesta del backend (update):', res),
        error: err => console.error('Error al actualizar la orden:', err),
      });
  }
  
  

  submit(): void {
    if (!this.form.valid) {
      this.message = 'Por favor, complete todos los campos obligatorios.';
      console.log('Formulario inválido:', this.form.value);
      return;
    }
  
    if (this.isEditing) {
      this.update(this.form.value.id);
    } else {
      this.create();
    }
  }
  

  deleteById(dishId: number): void {
    this.deleteOrders.execute<IResponse>(this.url + "/" + dishId)
      .pipe(
        tap(result => this.getAllOrders())
      ).subscribe();
  }


  calculateTotalPrice(): number {
    let totalPrice = 0;
  
    const selectedDishes = this.form.value.dishes
      ? this.form.value.dishes.map((dishId: string) =>
          this.dishes.find(dish => String(dish.id) === dishId)
        )
      : [];
  
    selectedDishes.forEach((dish: IResponseDishes | undefined) => {
      if (dish) {
        const dishPrice = dish.dishType === 'Popular' ? dish.price * 1.0573 : dish.price;
        totalPrice += dishPrice;
      }
    });
  
    const clientId = this.form.value.client;
    const client = this.clients.find(client => String(client.id) === clientId);
  
    if (client?.clientType === 'Frecuente') {
      totalPrice *= 0.9762;
    }
  
    return totalPrice;
  }
  
  
  
}