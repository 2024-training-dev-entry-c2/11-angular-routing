import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishDeleteComponent } from './components/dish-delete/dish-delete.component';
import { DishGetAllComponent } from './components/dish-get-all/dish-get-all.component';
import { DishGetByIdComponent } from './components/dish-get-by-id/dish-get-by-id.component';
import { DishUpdateComponent } from './components/dish-update/dish-update.component';
import { DishRegisterComponent } from './components/dish-register/dish-register.component';
import { LayoutDishComponent } from './components/layout-dish/layout-dish.component';

const routes: Routes = [
  {
    path: '', 
    component: LayoutDishComponent,
    children: [
      { path: '', component: DishGetAllComponent },   
      { path: 'agregar', component: DishRegisterComponent }, 
      { path: 'actualizar/:id', component: DishUpdateComponent }, 
      { path: 'eliminar/:id', component: DishDeleteComponent },
      { path: 'buscar', component: DishGetByIdComponent}, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DishRoutingModule {}