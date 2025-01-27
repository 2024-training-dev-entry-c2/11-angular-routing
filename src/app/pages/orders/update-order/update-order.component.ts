import {
  Component,
  EventEmitter,
  Inject,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ClientService } from '../../../services/client/client.service';
import { MenusService } from '../../../services/menu/menus.service';
import { OrderService } from '../../../services/order/order.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Client } from '../../../interfaces/client.interface';
import { Menu } from '../../../interfaces/menu.interface';
import { ModalComponent } from '../../../components/modal/modal.component';
import { Order } from '../../../interfaces/order.interface';

@Component({
  selector: 'app-update-order',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './update-order.component.html',
  styleUrl: './update-order.component.scss',
})
export class UpdateOrderComponent implements OnInit {
  public clients = inject(ClientService);
  public menu = inject(MenusService);
  public order = inject(OrderService);
  private formBuilder = inject(FormBuilder);
  public getClientData: Client[] = [];
  public getMenuData: Menu[] = [];
  dishfoodList: number[] = [];
  menus: { id: number; name: string }[] = [];
  dishfoods: any[] = [];
  menuId: number = 0;
  showModal = false;
  public filteredMenu: any = []; // Filtrado de platos
  public filteredDishes: any[] = []; //
  @Input() getOrderData: Order | any;
  @Input() showModalMenu!: boolean;
  @Output() closeModalMenu = new EventEmitter<void>();

  ngOnInit(): void {
    this.getClients();
    this.getMenus();
    this.showModal = true;
    this.dishfoodList = this.getOrderData.dishfoodIds;
    console.log(this.dishfoodList);
  }

  public updateOrderForm = this.formBuilder.group({
    clientId: [0, [Validators.required]],
    localDate: ['', [Validators.required]],
    menuId: [null],
    dishfoodIds: this.formBuilder.array([]),
  });

  updateOrder() {
    const updatePayload = {
      clientId: this.updateOrderForm.get('clientId')?.value,
      localDate: this.updateOrderForm.get('localDate')?.value,
      dishfoodIds: this.dishfoodList,
    };
    if (this.updateOrderForm.valid) {
      this.order
        .updateOrder(updatePayload as unknown as Order, this.getOrderData.id)
        .subscribe({
          next: (data) => {
            console.log(data);
            alert('Order updated successfully');
            this.showModal = false;
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  getClients() {
    this.clients.getClients().subscribe({
      next: (data) => {
        this.updateOrderForm.get('clientId')?.setValue(data[0].id);
        console.log(data);
        this.getClientData = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getMenus() {
    this.menu.getMenus().subscribe({
      next: (data) => {
        console.log(data);
        this.getMenuData = data;
        this.menus.splice(0, this.menus.length);
        this.dishfoods.splice(0, this.dishfoods.length);

        data.forEach((menu) => {
          this.menus.push({ id: menu.id, name: menu.name });

          menu.dishfoods.forEach((dish: any) => {
            this.dishfoods.push({
              ...dish,
              orderListSize: dish.orderList.length, // Agregar el tamaño de orderList
            });
          });
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  addDish(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedDishId = selectElement.value;
    const parsedId = parseInt(selectedDishId, 10);
    this.dishfoodList.push(parsedId);
    console.log(this.dishfoodList);

    const dishfoodIds = this.updateOrderForm.get('dishfoodIds') as FormArray;
    dishfoodIds.push(this.formBuilder.control(selectedDishId));
  }
  removeDish(index: any) {
    this.dishfoodList = this.dishfoodList.filter((item) => item !== index);
  }

  onMenuChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    console.log(selectElement);

    const menuId = this.updateOrderForm.get('menuId')?.value;
    if (menuId != null) {
      this.menuId = parseInt(menuId);
      this.filteredMenu = this.menus.filter(
        (menu) => menu.id === this.menuId
      ) as Menu[];
      this.filteredDishes = this.dishfoods.filter(
        (dish) => dish.menu === this.filteredMenu[0].name
      );
    } else {
      console.error('menuId is null or undefined');
    }
    const dishfoodSelect = document.getElementById(
      'dishfoodIds'
    ) as HTMLSelectElement;
    if (dishfoodSelect) {
      dishfoodSelect.value = '';
    }
  }
  getDishName(dishId: any): string {
    const dish = this.dishfoods.find((d) => d.id === dishId);
    return dish ? dish.name : '';
  }
  closeModal() {
    this.closeModalMenu.emit();
  }
}
