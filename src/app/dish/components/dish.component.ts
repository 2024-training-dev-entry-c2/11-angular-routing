import { Component, inject, OnInit } from '@angular/core';
import { ListDishesService } from '../services/list-dishes.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormDishComponent } from './form-dish/form-dish.component';
import { IDishResponse, IDish } from '../interfaces/dish.interface';
import { UpdateDishService } from '../services/update-dish.service';
import { DeleteCardComponent } from '../../delete-card/delete-card.component';
import { ListMenusService } from '../../menu/services/list-menus.service';
import { IMenuResponse } from '../../menu/interfaces/menu.interface';
import { forkJoin, switchMap } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-dish',
  imports: [
    FontAwesomeModule,
    FormDishComponent,
    DeleteCardComponent,
    DecimalPipe,
  ],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.scss',
})
export class DishComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  showSaveDish = false;
  showDeleteDish = false;

  private listMenusService = inject(ListMenusService);
  private listDishesService = inject(ListDishesService);
  private updateDishService = inject(UpdateDishService);

  menus: IMenuResponse[] = [];
  dishes: IDishResponse[][] = [];
  selectedDish: IDishResponse | null = null;
  selectedMenuId!: number;
  selectedIdDish!: number;
  selectedIndex!: number;

  ngOnInit(): void {
    this.listMenusService
      .execute()
      .pipe(
        switchMap((menus) => {
          this.menus = menus;
          const dishRequests = menus.map((menu) =>
            this.listDishesService.execute(menu.id)
          );
          return forkJoin(dishRequests);
        })
      )
      .subscribe((dishesArray) => {
        this.dishes = dishesArray;
        console.log(this.menus);
        console.log(this.dishes);
      });
  }

  showCreateDishModal(index: number): void {
    this.selectedMenuId = this.menus[index].id;
    this.showSaveDish = true;
  }

  showDeleteDishModal(idDish: number, index: number): void {
    this.selectedIdDish = idDish;
    this.selectedIndex = index;
    this.showDeleteDish = true;
  }

  showUpdateDishModal(selectedDish: IDishResponse, index: number): void {
    this.selectedMenuId = this.menus[index].id;
    console.log(this.selectedMenuId);
    this.selectedDish = selectedDish;
    if (this.selectedDish) {
      this.showSaveDish = true;
    }
  }

  closeCreateDishModal(): void {
    this.showSaveDish = false;
  }

  closeDeleteDishModal(): void {
    this.showDeleteDish = false;
  }

  clearSelectedDish(): void {
    this.selectedDish = null;
  }

  addDish(newDish: IDishResponse): void {
    const index = this.menus.findIndex((m) => m.id === this.selectedMenuId);
    if (index !== -1) {
      this.dishes[index] = [...this.dishes[index], newDish];
    }
  }

  replaceDish(updatedDish: IDishResponse): void {
    const index = this.menus.findIndex((m) => m.id === this.selectedMenuId);
    if (index !== -1) {
      const dishList = this.dishes[index];
      const index2 = dishList.findIndex((c) => c.id === updatedDish.id);
      if (index2 !== -1) {
        dishList[index2] = updatedDish;
      }
    }
    this.selectedDish = null;
  }

  deleteDish(idDish: number): void {
    const dish = this.dishes[this.selectedIndex].find((m) => m.id === idDish);
    if (dish) {
      const deletedDish: IDish = {
        dishName: dish.dishName,
        description: dish.description,
        basePrice: dish.basePrice,
        isPopular: dish.isPopular,
        menuId: this.menus[this.selectedIndex].id,
        active: false,
      };
      this.updateDishService.execute(idDish, deletedDish).subscribe(() => {
        this.dishes[this.selectedIndex] = this.dishes[
          this.selectedIndex
        ].filter((c) => c.id !== idDish);
        this.showDeleteDish = false;
      });
    }
  }
}
