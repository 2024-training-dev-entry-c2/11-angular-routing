import { Component, inject } from '@angular/core';
import { FormComponent } from '../../../template/main/form/form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDishService } from '../../../../services/dish/post-dish.service';
import { IDishRequest } from '../../../../interfaces/dish/dish.request.interface';

@Component({
  selector: 'app-register-dish',
  imports: [FormComponent],
  templateUrl: './register-dish.component.html'
})
export class RegisterDishComponent {
  formContent={
    title: 'Agregar plato',
    fields: [
      {key:'name',label:'Nombre', placeholder:'Ingresa el nombre del plato', type:'text', errorMessage:'No ha ingresado el dato' },
      {key:'description',label:'Descripción', placeholder:'Ingresa la descripción del plato', type:'text', errorMessage:'No ha ingresado el dato' },
      {key:'price',label:'Precio', placeholder:'Ingresa el nombre del plato', type:'number', errorMessage:'No ha ingresado el dato' },
      {key:'menu',label:'MenuId', placeholder:'Ingresa la id del Menú', type:'number', errorMessage:'No ha ingresado el dato' },
    ]
  };

  router = inject(Router);
  route = inject(ActivatedRoute);
  postDishService = inject(PostDishService);

  createDish(dishData: IDishRequest): void {
    this.postDishService.execute(dishData).subscribe(()=>{
      this.router.navigate(['../'], { relativeTo: this.route });
    } );
  }

  onSendForm(event: any){
    const dishRequest : IDishRequest = {name:'', description:'', price:0, menuId: 0};
    dishRequest.name = event.name;
    dishRequest.description = event.description;
    dishRequest.price = parseFloat(event.price);
    dishRequest.menuId = Number(event.menu);
    console.log(dishRequest);
    this.createDish(dishRequest);
  }
}
