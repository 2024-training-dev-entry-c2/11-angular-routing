import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ClientService } from '../../../services/client/client.service';
import { MenusService } from '../../../services/menu/menus.service';
import { OrderService } from '../../../services/order/order.service';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Client } from '../../../interfaces/client.interface';
import { Menu } from '../../../interfaces/menu.interface';

@Component({
  selector: 'app-add-order',
  imports: [ReactiveFormsModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss',
})
export class AddOrderComponent implements OnInit {
  ngOnInit(): void {
    this.getClients();
    this.getMenus();
    console.log(this.getMenuData);
  }
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
  public filteredMenu: any = []; 
  public filteredDishes: any[] = []; 
  @Output() updateList = new EventEmitter<void>();

  public addOrderForm = this.formBuilder.group({
    clientId: [0, [Validators.required]],
    localDate: ['', [Validators.required]],
    menuId: [null],
    dishfoodIds: this.formBuilder.array([]),
  });

  addOrder() {
    const updatePayload = {
      clientId: this.addOrderForm.get('clientId')?.value,
      localDate: this.addOrderForm.get('localDate')?.value,
      dishfoodIds: this.dishfoodList,
    };
    if (this.addOrderForm.valid) {
      this.order.addOrder(updatePayload as unknown as any).subscribe({
        next: (data) => {
          alert('Order added successfully');
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      console.log(this.addOrderForm.value);
    }
  }

  getClients() {
    this.clients.getClients().subscribe({
      next: (data) => {
        this.addOrderForm.get('clientId')?.setValue(data[0].id);
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
    const dishfoodIds = this.addOrderForm.get('dishfoodIds') as FormArray;
    dishfoodIds.push(this.formBuilder.control(selectedDishId));
  }
  removeDish(index: any) {
    this.dishfoodList = this.dishfoodList.filter((item) => item !== index);
  }

  onMenuChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    const menuId = this.addOrderForm.get('menuId')?.value;
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

    return dish ? `${dish.name} - ${dish.price} $` : '';
  }
  updateListOrder() {
    this.updateList.emit();
    console.log("Actualizando lista de pedidos");
    
  }
}
