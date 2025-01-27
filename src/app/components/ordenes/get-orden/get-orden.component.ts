import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdenService } from '../../../services/orden.service';
import { IViewOrden } from '../../../inferfaces/view-orden.interface';
import { BottonDeleteComponent } from '../../bottons/botton-delete/botton-delete.component';
import { CurrencyPipe } from '@angular/common';
import { ICreateOrden } from '../../../inferfaces/create-orden.interface';
import { BottonEditComponent } from "../../bottons/botton-edit/botton-edit.component";


@Component({
  selector: 'app-get-orden',
  imports: [ReactiveFormsModule, BottonDeleteComponent, CurrencyPipe, BottonEditComponent],
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

  statusOptions = ['PENDING', 'IN_PREPARATION', 'COMPLETED', 'CANCELLED', 'DELIVERED'];
  statusClassMap: Map<string, string> = new Map([
    ['PENDING', 'content__btn-pending'],
    ['IN_PREPARATION', 'content__btn-in-preparation'],
    ['COMPLETED', 'content__btn-completed'],
    ['CANCELLED', 'content__btn-cancelled'],
    ['DELIVERED', 'content__btn-delivered']
  ]);
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
  getButtonClass(status: string): string {
    return this.statusClassMap.get(status) || '';
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
  changeStatus(orden: IViewOrden): void {
    const currentIndex = this.statusOptions.indexOf(orden.statusOrder);
    const nextIndex = (currentIndex + 1) % this.statusOptions.length;
    const newStatus = this.statusOptions[nextIndex];

    this.ordenService.updateStatusOrden(orden.id, newStatus).subscribe({
      next: (updatedOrden: IViewOrden) => {
        const index = this.ordenes.findIndex(o => o.id === updatedOrden.id);
        if (index !== -1) {
          this.ordenes[index] = updatedOrden;
        }
      },
      error: (error: any) => {
        console.error('Error al actualizar el estado:', error);
      }
    });
  }

}
