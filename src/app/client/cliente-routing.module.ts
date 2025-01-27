
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutClientComponent } from './components/layout-client/layout-client.component';
import { DeleteComponent } from './components/delete/delete.component';
import { GetAllComponent } from './components/get-all/get-all.component';
import { UpdateComponent } from './components/update/update.component';
import { RegisterComponent } from './components/register/register.component';
import { GetByIdComponent } from './components/get-by-id/get-by-id.component';


const routes: Routes = [
  {
    path: '', 
    component: LayoutClientComponent,
    children: [
      { path: '', component: GetAllComponent },   
      { path: 'agregar', component: RegisterComponent }, 
      { path: 'actualizar/:id', component: UpdateComponent }, 
      { path: 'eliminar/:id', component: DeleteComponent },
      { path: 'buscar', component: GetByIdComponent}, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
