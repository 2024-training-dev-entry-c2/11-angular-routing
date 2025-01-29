import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { GetOrdenComponent } from '../get-orden/get-orden.component';
import { AddOrdenComponent } from '../add-orden/add-orden.component';
import { ICreateOrden } from '../../../inferfaces/create-orden.interface';
import { OrdenService } from '../../../services/orden.service';
import { IViewOrden } from '../../../inferfaces/view-orden.interface';
import { ModalComponent } from "../../modal/modal.component";


@Component({
  selector: 'app-orden',
  imports: [GetOrdenComponent, AddOrdenComponent, ModalComponent],
  templateUrl: './orden.component.html',
  styleUrl: './orden.component.scss'
})
export class OrdenComponent {
  private ordenService = inject(OrdenService);
  ordenEdit: ICreateOrden | null = null;
  ordenes: ICreateOrden[] = [];
  isModalVisible: boolean = false;
  @ViewChild(GetOrdenComponent) getOrdenComponent!: GetOrdenComponent;


  ngOnInit() {
    this.loadOrdenes();
  }
  addOrden() {
    this.ordenEdit = null;
    this.isModalVisible = true;
  }
  editOrden(id: number) {
    this.ordenService.getOrdenById(id).subscribe((data: any) => {
      this.ordenEdit = {
        ...data,
        clientId: data.client?.id || 0,
      };
      this.isModalVisible = true;
    });
  }

  onOrdenUpdated() {
    this.getOrdenComponent.loadOrdenes();
    setTimeout(() => {
      this.isModalVisible = false;
    }, 2000);
  }

  loadOrdenes() {
    this.ordenService.execute().subscribe({
      next: (data: IViewOrden[]) => {
        this.ordenes = data.map(orden => ({
          ...orden,
          clientId: orden.client?.id || 0,
        } as unknown as ICreateOrden));
      },
      error: (error) => {
        console.error('Error al cargar las órdenes', error);
      }
    });
  }
  closeModal() {
    this.isModalVisible = false;
  }
}
