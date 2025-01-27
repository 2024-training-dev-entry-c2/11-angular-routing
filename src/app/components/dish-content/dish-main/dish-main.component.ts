import { Component, OnInit, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../../../services/dish.service';
import { ModalService } from '../../../services/modal.service';
import { IDish } from '../../../interfaces/dish.interface';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IMenu } from '../../../interfaces/menu.interface';
import { MenuService } from '../../../services/menu.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dish-main',
  imports: [CurrencyPipe, FormsModule, CommonModule],
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
  menuId!: number;  
  filteredMenus: IMenu[] = []; 
  menus: IMenu[] = []; 
  dishMenuMap: Map<number, number> = new Map();


  @Input() searchQuery: string = ''; 

  constructor(
    private dishService: DishService,
    private menuService: MenuService,
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.filteredMenus = [];
      this.loadDishes(); 
  }

  getHeaders() {
    return [
      { label: 'Plato ID' },
      { label: 'Nombre del Plato' },
      { label: 'Precio' },
      { label: 'Descripción' },
      { label: 'Es Popular' },
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
    this.filteredDishes = [];
    this.menuService.getMenus().subscribe(
      (menus) => {
        this.menus = menus; 
        this.filteredMenus = menus;

        for (let i = 0; i < this.filteredMenus.length; i++) {
          this.dishService.getAllDishesFromMenu(this.filteredMenus[i].idMenu).subscribe(
            (dishes) => {
              dishes.forEach(dish => this.dishMenuMap.set(dish.idDish, this.filteredMenus[i].idMenu));
              this.dishes.push(...dishes); 
              this.filteredDishes = [...this.dishes]; 
            },
            (error) => {
              console.error('Error al cargar los platos:', error);
            }
          );
        }
      });
    
  }

  addDish(newDish: IDish): void {
        this.dishes.push(newDish);
        this.filterDishes(); 
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
      this.resetModalFields();
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
        this.loadDishes();  
      },
      (error) => {
        console.error('Error al actualizar el plato:', error);
      }
    );
  }

  deleteDish(dishId: number): void {
    const menuId = this.dishMenuMap.get(dishId); // Intentar obtener el menuId
  
    if (!menuId) {
      console.error('No se encontró el ID del menú para este plato. Mapa actual:', this.dishMenuMap);
      return;
    }
  
    console.log(`Intentando eliminar plato con ID ${dishId} del menú con ID ${menuId}...`);
  
    this.dishService.deleteDishFromMenu(menuId, dishId).subscribe(
      () => {
        console.log(`Plato eliminado exitosamente: ${dishId} del menú ${menuId}`);
  
        // Actualizar las listas locales
        this.dishes = this.dishes.filter(dish => dish.idDish !== dishId);
        this.filteredDishes = this.filteredDishes.filter(dish => dish.idDish !== dishId);
  
        console.log('Platos actuales después de eliminar:', this.dishes);
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
