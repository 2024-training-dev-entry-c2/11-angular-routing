import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdenService } from '../../service/orden.service';
import { IViewOrden } from '../../inferfaces/view-orden.interface';
import { BottonDeleteComponent } from '../botton-delete/botton-delete.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-get-orden',
  imports: [ReactiveFormsModule, BottonDeleteComponent, CurrencyPipe],
  templateUrl: './get-orden.component.html',
  styleUrl: './get-orden.component.scss'
})
export class GetOrdenComponent implements OnInit{
  private ordenService = inject(OrdenService);

  ordenes: IViewOrden[] = [];
  items: IViewOrden[]=[];
  restaurantId = 11;

  ngOnInit() {

    this.ordenService.execute().subscribe({
      next: (data: IViewOrden[]) => {
        this.ordenes = data;
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
    this.ordenService.deleteOrderById(id).subscribe({
      next: () => {
        this.ordenes = this.ordenes.filter((orden) => orden.id !== id);
      },
      error: (error: any) => {
        console.error('Error al eliminar la orden:', error);
      }
    });
  }


}
