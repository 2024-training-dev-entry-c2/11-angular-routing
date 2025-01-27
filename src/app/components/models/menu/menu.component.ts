import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IMenu } from '../../../interfaces/menu.interface';
import { RouterLink } from '@angular/router';
import { MenuTableComponent } from './menu-table/menu-table.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink, MenuTableComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent{
  menus = new BehaviorSubject<IMenu[]>([]);

  constructor() {}

  // ngOnInit(): void {
  //   this.getAllMenuService.execute().subscribe((data) => {
  //     this.menus = data.map(menu => ({
  //       ...menu,
  //       dishes: menu.dishes ?? [],
  //     }));
  //   });
  // }
  

  // hasDishes(menu: IMenu): string {
  //   return (menu.dishes && menu.dishes.length > 0) ? 'Platillos incluidos:' : 'Sin platillos asociados';
  // }

  // goToEditClient(menuId: number): void {
  //   this.router.navigate([`/edit-menu/${menuId}`]);
  // }
  
  // deleteMenu(menuId: number): void {
  //   if (confirm('¿Seguro que deseas eliminar este menú?')) {
  //     this.deleteMenuService.deleteMenu(menuId).subscribe(
  //       () => {
  //         this.menus = this.menus.filter(menu => menu.id !== menuId);
  //       },
  //       (error) => {
  //         console.error('Error al eliminar el menú:', error);
  //       }
  //     )
  //   }
  // }
  
}
