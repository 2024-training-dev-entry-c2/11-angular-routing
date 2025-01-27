import { Component, inject } from '@angular/core';
import { GetOrdenComponent } from '../get-orden/get-orden.component';
import { AddOrdenComponent } from '../add-orden/add-orden.component';
import { ICreateOrden } from '../../../inferfaces/create-orden.interface';
import { OrdenService } from '../../../services/orden.service';


@Component({
  selector: 'app-orden',
  imports: [GetOrdenComponent, AddOrdenComponent],
  templateUrl: './orden.component.html',
  styleUrl: './orden.component.scss'
})
export class OrdenComponent {
  private ordenService = inject(OrdenService);
  ordenEdit: ICreateOrden | null = null;

  editOrden(id: number) {
    this.ordenService.getOrdenById(id).subscribe((data: any) => {
      console.log('Datos recibidos del backend:', data);
      this.ordenEdit = {
        ...data,
        clientId: data.client?.id || 0,
      };
      console.log('Orden para editar:', this.ordenEdit);
    });
  }

}
