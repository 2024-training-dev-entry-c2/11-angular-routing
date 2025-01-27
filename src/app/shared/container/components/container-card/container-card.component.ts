import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from '@interfaces/customer.interface';
import { IDish } from '@interfaces/dish.interface';
import { CustomersService } from '@services/customer/customers.service';
import { DishesService } from '@services/dishes/dishes.service';

@Component({
  selector: 'app-container-card',
  imports: [CommonModule],
  templateUrl: './container-card.component.html',
  styleUrl: './container-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerCardComponent {

  customerService = inject(CustomersService);
  dishesService = inject(DishesService);

  router = inject(Router);

  @Input() customer: ICustomer = {} as ICustomer;
  @Input() dish: IDish = {} as IDish;

  @Input({transform: booleanAttribute}) isCustomer: boolean = false;
  @Input({transform: booleanAttribute}) isDishes: boolean = false;



  updateCustomer(){
    this.router.navigate([`/dashboard/customer/update/${this.customer.id}`]);
  }

  removeCustomer(){
    this.customerService.remove(this.customer.id);
  }

  updateDish(){
    this.router.navigate([`/dashboard/dishes/update/${this.dish.id}`]);
  }

  removeDish(){
    this.dishesService.remove(this.dish.id);
  }
 }
