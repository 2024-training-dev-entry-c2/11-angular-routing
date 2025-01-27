import { Component, inject } from '@angular/core';
import { FormComponent } from '../../../template/main/form/form.component';
import { IDishResponse } from '../../../../interfaces/dish/dish.response.interface';
import { GetDishService } from '../../../../services/dish/get-dish.service';
import { PutDishService } from '../../../../services/dish/put-dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDishRequest } from '../../../../interfaces/dish/dish.request.interface';

@Component({
  selector: 'app-update-dish',
  imports: [FormComponent],
  templateUrl: './update-dish.component.html',
  styleUrl: './update-dish.component.scss'
})
export class UpdateDishComponent {
  formContent={
    title: 'Actualizar plato',
    fields: [
      {key:'name',label:'Nombre', placeholder:'Ingresa el nombre del plato', type:'text', errorMessage:'No ha ingresado el dato' },
      {key:'description',label:'Descripción', placeholder:'Ingresa la descripción del plato', type:'text', errorMessage:'No ha ingresado el dato' },
      {key:'price',label:'Precio', placeholder:'Ingresa el nombre del plato', type:'number', errorMessage:'No ha ingresado el dato' },
      {key:'menu',label:'MenuId', placeholder:'Ingresa la id del Menú', type:'number', errorMessage:'No ha ingresado el dato' },
    ]
  };

  id: string | null = null;
  
  initialData: {key:keyof IDishResponse, content:any}[] = [
    {key:'name', content: ''},
    {key:'description', content: ''},
    {key:'price', content: ''},
    {key:'menuId', content: ''},
  ];
  
  getDishService = inject(GetDishService);
  putDishService = inject(PutDishService);

  
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDishService.execute(this.id!).subscribe((response)=>{
      this.initialData.forEach(dataField => {
        if (response[dataField.key] !== undefined) {
          dataField.content = response[dataField.key].toString() ?? '';
        }
      });
    })
  }
  
  updateMenu(id:string, dishData: IDishRequest): void{
    this.putDishService.execute(id,dishData).subscribe(()=>{
      this.router.navigate(['../../'], { relativeTo: this.route });
    });
  }

  onSendForm(event: any){
    const dishRequest : IDishRequest = {name:'', description:'', price:0, menuId: 0};
    dishRequest.name = event.name;
    dishRequest.description = event.description;
    dishRequest.price = parseFloat(event.price);
    dishRequest.menuId = Number(event.menu);
    this.updateMenu(this.id!, dishRequest);
  }
}
