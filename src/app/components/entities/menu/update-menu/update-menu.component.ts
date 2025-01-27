import { Component, inject } from '@angular/core';
import { FormComponent } from '../../../template/main/form/form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PutMenuService } from '../../../../services/menu/put-menu.service';
import { IMenuResponse } from '../../../../interfaces/menu/menu.response.interface';
import { IMenuRequest } from '../../../../interfaces/menu/menu.request.interface';
import { GetMenuService } from '../../../../services/menu/get-menu.service';

@Component({
  selector: 'app-update-menu',
  imports: [FormComponent],
  templateUrl: './update-menu.component.html',
  styleUrl: './update-menu.component.scss'
})
export class UpdateMenuComponent {
  formContent={
    title: 'Actualizar menú',
    fields: [{key:'name',label:'Nombre', placeholder:'Ingresa el nombre del menú', type:'text', errorMessage:'No ha ingresado el dato' }]
  };

  id: string | null = null;
  
  initialData: {key:keyof IMenuResponse, content:string}[] = [
    {key:'name', content: ''}
  ];

  router = inject(Router);
  route = inject(ActivatedRoute);
  getMenuService = inject(GetMenuService);
  putMenuService = inject(PutMenuService);

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.getMenuService.execute(this.id!).subscribe((response)=>{
      this.initialData.forEach(dataField => {
        if (response[dataField.key] !== undefined) {
          dataField.content = response[dataField.key].toString();
        }
      });
    })
  }

  updateMenu(id:string, menuData: IMenuRequest): void{
    this.putMenuService.execute(id,menuData).subscribe(()=>{
      this.router.navigate(['../../'], { relativeTo: this.route });
    });
  }

  onSendForm(event: any){
    const menuRequest : IMenuRequest = {name:''};
    menuRequest.name = event.name;
    this.updateMenu(this.id!, menuRequest);
  }
}
