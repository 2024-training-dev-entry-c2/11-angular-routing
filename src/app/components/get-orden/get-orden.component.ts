import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GetOrdenService } from '../../service/get-orden.service';
import { IViewOrden } from '../../inferfaces/view-orden.interface';

@Component({
  selector: 'app-get-orden',
  imports: [ReactiveFormsModule],
  templateUrl: './get-orden.component.html',
  styleUrl: './get-orden.component.scss'
})
export class GetOrdenComponent implements OnInit{
  private getOrdenService = inject(GetOrdenService);

  ordenes: IViewOrden[] = [];
  items: IViewOrden[]=[];
  restaurantId = 11;

  ngOnInit() {
    this.getOrdenService.execute().subscribe({
      next: (data: IViewOrden[]) => {
        this.ordenes = data;

        console.log(this.ordenes );
      },
      error: (error) => {
        console.error('Error al obtener la orden', error);
      }
    });
  }
  editOrden(id: number): void {
    console.log(`Editar orden con ID: ${id}`);

  }

  deleteOrden(id: number): void {
    console.log(`Eliminar orden con ID: ${id}`);

  }
}
