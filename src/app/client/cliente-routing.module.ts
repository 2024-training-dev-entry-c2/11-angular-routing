
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutClientComponent } from './components/layout-client/layout-client.component';
import { DeleteComponent } from './components/delete/delete.component';
import { GetAllComponent } from './components/get-all/get-all.component';
import { UpdateComponent } from './components/update/update.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {
    path: '', // Ruta base /cliente
    component: LayoutClientComponent,
    children: [
      { path: '', component: GetAllComponent },   // /cliente
      { path: 'agregar', component: RegisterComponent }, // /cliente/crear
      { path: 'actualizar/:id', component: UpdateComponent }, // /cliente/editar/4
      { path: 'eliminar/:id', component: DeleteComponent }, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
