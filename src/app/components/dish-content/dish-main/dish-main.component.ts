import { Component, OnInit, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../../../services/dish.service';
import { ModalService } from '../../../services/modal.service';
import { IDish } from '../../../interfaces/dish.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dish-main',
  imports: [CurrencyPipe],
  templateUrl: './dish-main.component.html',
  styleUrls: ['./dish-main.component.scss'],
})
export class DishMainComponent implements OnInit {
  dishes: IDish[] = [];
  filteredDishes: IDish[] = [];
  modalType: string = '';
  dishName: string = '';
  price: number = 0;
  description: string = '';
  isPopular: boolean = false;
  selectedDishId: number | null = null;
  menuId!: number;  // Capturado desde la URL

  @Input() searchQuery: string = ''; // Para filtrar los platos

  constructor(
    private dishService: DishService,
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.menuId = +params['menuId']; // Convertir a número
      if (!this.menuId) {
        console.error('El ID del menú es necesario para cargar los platos.');
        return;
      }
      this.loadDishes();  // Cargar platos después de obtener el ID
    });
  }

  getHeaders() {
    return [
      { label: 'Plato ID' },
      { label: 'Nombre del Plato' },
      { label: 'Precio' },
      { label: 'Descripción' },
      { label: 'Es Popular' },
      { label: 'Menu ID' },
      { label: 'Acciones' },
    ];
  }

  getActions() {
    return [
      { label: 'Editar', type: 'edit', icon: 'svg/edit.svg#edit' },
      { label: 'Eliminar', type: 'delete', icon: 'svg/delete.svg#delete' },
    ];
  }

  loadDishes(): void {
    if (!this.menuId) {
      console.error('El ID del menú es necesario para cargar los platos.');
      return;
    }

    this.dishService.getAllDishesFromMenu(this.menuId).subscribe(
      (dishes) => {
        this.dishes = dishes;
        this.filteredDishes = [...dishes];
      },
      (error) => {
        console.error('Error al cargar los platos:', error);
      }
    );
  }

  filterDishes(): void {
    if (this.searchQuery) {
      this.filteredDishes = this.dishes.filter((dish) =>
        dish.dishName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredDishes = [...this.dishes];
    }
  }

  openModal(modalTemplate: TemplateRef<any>, type: string, id: number | null = null): void {
    this.modalType = type;
    this.selectedDishId = id;

    if (type === 'edit' && id) {
      this.loadDishDetails(id);
    } else {
      this.resetModalFields();  // Reiniciar campos si es agregar
    }

    this.modalService
      .open(modalTemplate, this.viewContainerRef, {
        title: type === 'edit' ? 'Editar Plato' : 'Eliminar Plato',
        buttonName: 'Confirmar',
      })
      .subscribe(() => {
        if (type === 'edit' && this.selectedDishId) {
          const updatedDish: IDish = {
            idDish: this.selectedDishId,
            dishName: this.dishName,
            price: this.price,
            description: this.description,
            isPopular: this.isPopular,
          };
          this.updateDish(this.selectedDishId, updatedDish);
        } else if (type === 'delete' && this.selectedDishId) {
          this.deleteDish(this.selectedDishId);
        }
      });
  }

  loadDishDetails(id: number): void {
    if (!this.menuId) {
      console.error('El ID del menú es necesario para cargar los detalles del plato.');
      return;
    }

    this.dishService.getDishFromMenu(this.menuId, id).subscribe(
      (dish) => {
        this.dishName = dish.dishName;
        this.price = dish.price;
        this.description = dish.description;
        this.isPopular = dish.isPopular;
      },
      (error) => {
        console.error('Error al cargar los detalles del plato:', error);
      }
    );
  }

  updateDish(id: number, updatedDish: IDish): void {
    if (!this.menuId) {
      console.error('El ID del menú es necesario para actualizar un plato.');
      return;
    }

    this.dishService.updateDishInMenu(this.menuId, id, updatedDish).subscribe(
      () => {
        console.log('Plato actualizado.');
        this.loadDishes();  // Recargar los platos
      },
      (error) => {
        console.error('Error al actualizar el plato:', error);
      }
    );
  }

  deleteDish(id: number): void {
    if (!this.menuId) {
      console.error('El ID del menú es necesario para eliminar un plato.');
      return;
    }

    this.dishService.deleteDishFromMenu(this.menuId, id).subscribe(
      () => {
        console.log('Plato eliminado.');
        this.loadDishes();  // Recargar los platos
      },
      (error) => {
        console.error('Error al eliminar el plato:', error);
      }
    );
  }

  resetModalFields(): void {
    this.dishName = '';
    this.price = 0;
    this.description = '';
    this.isPopular = false;
    this.selectedDishId = null;
  }
}
