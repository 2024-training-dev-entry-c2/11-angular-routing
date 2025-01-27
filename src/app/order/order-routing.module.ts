
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutOrderComponent } from './components/layout-order/layout-order.component';
import { OrderDeleteComponent } from './components/order-delete/order-delete.component';
import { OrderGetAllComponent } from './components/order-get-all/order-get-all.component';
import { OrderGetByIdComponent } from './components/order-get-by-id/order-get-by-id.component';
import { OrderRegisterComponent } from './components/order-register/order-register.component';
import { OrderUpdateComponent } from './components/order-update/order-update.component';

const routes: Routes = [
  {
    path: '', 
    component: LayoutOrderComponent,
    children: [
      { path: '', component: OrderGetAllComponent },   
      { path: 'agregar', component: OrderRegisterComponent }, 
      { path: 'actualizar/:id', component: OrderUpdateComponent }, 
      { path: 'eliminar/:id', component: OrderDeleteComponent },
      { path: 'buscar', component: OrderGetByIdComponent}, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}