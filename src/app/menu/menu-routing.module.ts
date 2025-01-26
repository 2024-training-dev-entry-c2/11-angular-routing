
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMenuComponent } from './components/layout-menu/layout-menu.component';
import { MenuDeleteComponent } from './components/menu-delete/menu-delete.component';
import { MenuGetAllComponent } from './components/menu-get-all/menu-get-all.component';
import { MenuGetByIdComponent } from './components/menu-get-by-id/menu-get-by-id.component';
import { MenuUpdateComponent } from './components/menu-update/menu-update.component';
import { MenuRegisterComponent } from './components/menu-register/menu-register.component';

const routes: Routes = [
  {
    path: '', 
    component: LayoutMenuComponent,
    children: [
      { path: '', component: MenuGetAllComponent },   
      { path: 'agregar', component: MenuRegisterComponent }, 
      { path: 'actualizar/:id', component: MenuUpdateComponent }, 
      { path: 'eliminar/:id', component: MenuDeleteComponent },
      { path: 'buscar', component: MenuGetByIdComponent}, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}