import { Component, inject, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOrder } from '../../../../interfaces/order.interface';
import { EditOrderService } from '../../../../services/order/edit-order.service';
import { GetOrderService } from '../../../../services/order/get-order.service';
import { GetAllClientService } from '../../../../services/client/get-all-client.service';
import { GetAllDishService } from '../../../../services/dish/get-all-dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IClient } from '../../../../interfaces/client.interface';
import { IDish } from '../../../../interfaces/dish.interface';
import { AddOrderService } from '../../../../services/order/add-order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  orders: IOrder[] = [];
  clients: IClient[] = [];
  dishes: IDish[] = [];
  private editOrderService = inject(EditOrderService);
  private addOrderService = inject(AddOrderService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected orderId: number | null = null;
  isLoading = true;

  constructor( 
    private fb: FormBuilder,
    private getAllClientService: GetAllClientService,
    private getAllDishService: GetAllDishService,
    private getOrderService: GetOrderService,
  ) {
    this.orderForm = this.fb.group({
      clientId: ['', Validators.required],
      dishIds: [[], Validators.required],
    });
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if(id) {
        this.orderId = +id;
        this.orderData(this.orderId);
      } else {
        this.isLoading = false;
      }
    });
    this.loadClients();
    this.loadDishes();
  }


  loadClients(): void {
    this.getAllClientService.execute().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (e) => {
        console.error('Error al cargar los clientes:', e);
      },
    });
  }

  loadDishes(): void {
    this.getAllDishService.execute().subscribe({
      next: (data) => {
        this.dishes = data;
      },
      error: (e) => {
        console.error('Error al cargar los platos:', e);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  orderData(id: number): void {
    this.getOrderService.execute(id).subscribe({
      next: (order) => {
        this.orderForm.patchValue(order);
        this.isLoading = false;
      },
      error: (e) => {
        console.error('Error al cargar los datos de la orden:', e);
        this.isLoading = false;
      },
    });
  }


  submit(): void {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;

      if (this.orderId) {
        this.editOrderService.updateOrder(this.orderId, orderData).subscribe({
          next: () => {
            this.router.navigate(['/order']);
          },
          error: (e) => {
            console.error('Error al actualizar la orden:', e);
          },
        });
      } else {
        this.addOrderService.execute(orderData).subscribe({
          next: () => {
            this.router.navigate(['/order']);
          },
          error: (e) => {
            console.error('Error al agregar la orden:', e);
          },
        });
      }
    }
    
    
  }
}
