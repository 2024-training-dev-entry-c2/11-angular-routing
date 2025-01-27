import { Component, inject } from '@angular/core';
import { FormComponent } from '../../../template/main/form/form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PostMenuService } from '../../../../services/menu/post-menu.service';
import { IMenuRequest } from '../../../../interfaces/menu/menu.request.interface';

@Component({
  selector: 'app-register-menu',
  imports: [FormComponent],
  templateUrl: './register-menu.component.html'
})
export class RegisterMenuComponent {
  formContent={
    title: 'Registrar menú',
    fields: [{key:'name',label:'Nombre', placeholder:'Ingresa el nombre del menú', type:'text', errorMessage:'No ha ingresado el dato' }]
  };

  router = inject(Router);
  route = inject(ActivatedRoute);
  postMenuService = inject(PostMenuService);

  createMenu(menuData: IMenuRequest): void {
    this.postMenuService.execute(menuData).subscribe(()=>{
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  onSendForm(event: any){
    const menuRequest : IMenuRequest = {name:''};
    menuRequest.name = event.name;
    this.createMenu(menuRequest);
  }
}
