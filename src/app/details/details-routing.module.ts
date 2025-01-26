
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDetailsComponent } from './components/layout-details/layout-details.component';
import { DetailsDeleteComponent } from './components/details-delete/details-delete.component';
import { DetailsGetAllComponent } from './components/details-get-all/details-get-all.component';
import { DetailsGetByIdComponent } from './components/details-get-by-id/details-get-by-id.component';
import { DetailsRegisterComponent } from './components/details-register/details-register.component';
import { DetailsUpdateComponent } from './components/details-update/details-update.component';

const routes: Routes = [
  {
    path: '', 
    component: LayoutDetailsComponent,
    children: [
      { path: '', component: DetailsGetAllComponent },   
      { path: 'agregar', component: DetailsRegisterComponent }, 
      { path: 'actualizar/:id', component: DetailsUpdateComponent }, 
      { path: 'eliminar/:id', component: DetailsDeleteComponent },
      { path: 'buscar', component: DetailsGetByIdComponent}, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DetailsRoutingModule {}