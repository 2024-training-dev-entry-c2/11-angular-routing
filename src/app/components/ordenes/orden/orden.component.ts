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
  @ViewChild(GetOrdenComponent) getOrdenComponent!: GetOrdenComponent;
  isModalVisible: boolean = false;
  ngOnInit() {
    this.loadOrdenes();
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
  editOrden(id: number) {
    this.ordenService.getOrdenById(id).subscribe((data: any) => {
      console.log('Datos recibidos del backend:', data);
      this.ordenEdit = {
        ...data,
        clientId: data.client?.id || 0,
      };
      this.isModalVisible = true;
    });
  }
  addOrden() {
    this.ordenEdit = null;
    this.isModalVisible = true;
  }
  onOrdenUpdated() {
    this.loadOrdenes();
    setTimeout(() => {
      this.isModalVisible = false;
    }, 2000);
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
