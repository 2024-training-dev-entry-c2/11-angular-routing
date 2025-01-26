import { Component, inject } from '@angular/core';
import { GetDishesService } from '../../../services/dish/get-dishes.service';
import { PostDishService } from '../../../services/dish/post-dish.service';
import { PutDishService } from '../../../services/dish/put-dish.service';
import { DeleteDishService } from '../../../services/dish/delete-dish.service';
import { IDishResponse } from '../../../interfaces/dish/dish.response.interface';
import { IDishRequest } from '../../../interfaces/dish/dish.request.interface';
import { FormComponent } from '../../template/main/form/form.component';

@Component({
  selector: 'app-dish',
  imports: [FormComponent],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.scss'
})
export class DishComponent {
  formContent={
    title: 'Registrar plato',
    fields: [
      {key:'name',label:'Nombre', placeholder:'Ingresa el nombre del plato', type:'text', errorMessage:'No ha ingresado el dato' },
      {key:'description',label:'Descripción', placeholder:'Ingresa la descripción del plato', type:'text', errorMessage:'No ha ingresado el dato' },
      {key:'price',label:'Precio', placeholder:'Ingresa el nombre del plato', type:'number', errorMessage:'No ha ingresado el dato' },
      {key:'menu',label:'MenuId', placeholder:'Ingresa la id del Menú', type:'number', errorMessage:'No ha ingresado el dato' },
    ]
  };
  
  tableContent:{ titles: string[]; content: string[][];} = { titles: [], content: [] };
  idToUpdate: string | null = null;

  getDishesService = inject(GetDishesService);
  postDishService = inject(PostDishService);
  putDishService = inject(PutDishService);
  deleteDishService = inject(DeleteDishService);

  ngOnInit(){
    this.getData();
  }

  getData(): void{
    this.getDishesService.execute().subscribe((menus: IDishResponse[])=>{
      this.transformMenuResponse(menus);
    })
  }

  private transformMenuResponse(dishes: IDishResponse[]): void {
    const titles = ['Id', 'Menú', 'Platos'];
    const content = dishes.map(dish =>[
      dish.id.toString(),
      dish.name,
      dish.description,
      dish.price.toString(),
      dish.state,
      dish.menuId.toString()
    ]);

    this.tableContent={titles, content};
  }

  createMenu(dishData: IDishRequest): void {
    this.postDishService.execute(dishData).subscribe(
      () => {
        this.getData();
      }
    );
  }

  updateMenu(id:string, dishData: IDishRequest): void{
    this.putDishService.execute(id,dishData).subscribe(
      () => {
        console.log('Actualizado');
        this.getData();
      }
    );
  }

  deleteMenu(id:string): void {
    console.log("Entro");
    this.deleteDishService.execute(id).subscribe(()=>{
      console.log("Eliminado");
      this.getData();
    }     
    );
  }

  onSendForm(event: any){
    const dishRequest : IDishRequest = {name:'', description:'', price:0, menuId: 0};
    dishRequest.name = event.name;
    dishRequest.description = event.description;
    dishRequest.price = parseFloat(event.price);
    dishRequest.menuId = Number(event.menu);
    console.log(dishRequest);
    this.createMenu(dishRequest);
  }

  onSendUpdatedForm(event: any){
    const dishRequest : IDishRequest = {name:'', description:'', price:0, menuId: 0};
    dishRequest.name = event.name;
    dishRequest.description = event.description;
    dishRequest.price = parseFloat(event.price);
    dishRequest.menuId = Number(event.menu);
    console.log(event.idItem);
    this.updateMenu(event.idItem, dishRequest);
  }
}
