import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdenService } from '../../services/orden.service';
import { IViewOrden } from '../../inferfaces/view-orden.interface';
import { BottonDeleteComponent } from '../botton-delete/botton-delete.component';
import { CurrencyPipe } from '@angular/common';
import { ICreateOrden } from '../../inferfaces/create-orden.interface';


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
  ordenEdit: ICreateOrden | null = null;
  @Output() editOrdenEvent = new EventEmitter<number>();

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

  editOrden(id: number) {
    this.editOrdenEvent.emit(id);
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
