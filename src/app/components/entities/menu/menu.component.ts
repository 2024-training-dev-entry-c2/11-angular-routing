import { Component, inject } from '@angular/core';
import { IMenuResponse } from '../../../interfaces/menu/menu.response.interface';
import { GetMenusService } from '../../../services/menu/get-menus.service';
import { ContainerComponent } from "../../template/main/container/container.component";
import { PostMenuService } from '../../../services/menu/post-menu.service';
import { IMenuRequest } from '../../../interfaces/menu/menu.request.interface';
import { BoardComponent } from '../../template/main/board/board.component';
import { FormComponent } from '../../template/main/form/form.component';
import { RightMenuComponent } from '../../template/main/right-menu/right-menu.component';
import { DeleteMenuService } from '../../../services/menu/delete-menu.service';
import { PutMenuService } from '../../../services/menu/put-menu.service';

@Component({
  selector: 'app-menu',
  imports: [ FormComponent ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  items=[
    {url:'', text:'Consultar menús'},
    {url:'', text:'Registrar menú'},
    {url:'', text:'Actualizar menú'}
  ];
  
  formContent={
    title: 'Registrar menú',
    fields: [{key:'name',label:'Nombre', placeholder:'Ingresa el nombre del menú', type:'text', errorMessage:'No ha ingresado el dato' }]
  };
  
  tableContent:{ titles: string[]; content: string[][];} = { titles: [], content: [] };
  idToUpdate: string | null = null;

  getMenusService = inject(GetMenusService);
  postMenuService = inject(PostMenuService);
  putMenuService = inject(PutMenuService);
  deleteMenuService = inject(DeleteMenuService);

  ngOnInit(){
    this.getData();
  }

  getData(): void{
    this.getMenusService.execute().subscribe((menus: IMenuResponse[])=>{
      this.transformMenuResponse(menus);
    })
  }

  private transformMenuResponse(menus: IMenuResponse[]): void {
    const titles = ['Id', 'Menú', 'Platos'];
    const content = menus.map(menu =>[
      menu.id.toString(),
      menu.name,
      menu.dishes.map(dish => `• ${dish.name}`).join('<br>')
    ]);

    this.tableContent={titles, content};
  }

  createMenu(menuData: IMenuRequest): void {
    this.postMenuService.execute(menuData).subscribe(
      () => {
        this.getData();
      }
    );
  }

  updateMenu(id:string, menuData: IMenuRequest): void{
    this.putMenuService.execute(id,menuData).subscribe(
      () => {
        console.log('Actualizado');
        this.getData();
      }
    );
  }

  deleteMenu(id:string): void {
    console.log("Entro");
    this.deleteMenuService.execute(id).subscribe(()=>{
      console.log("Eliminado");
      this.getData();
    }     
    );
  }

  onSendForm(event: any){
    const menuRequest : IMenuRequest = {name:''};
    menuRequest.name = event.name;
    this.createMenu(menuRequest);
  }

  onSendUpdatedForm(event: any){
    const menuRequest : IMenuRequest = {name:''};
    menuRequest.name = event.name;
    console.log(event.idItem);
    this.updateMenu(event.idItem, menuRequest);
  }
}
