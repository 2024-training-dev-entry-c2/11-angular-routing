import { Component,  inject, OnInit } from '@angular/core';
import { IMenu } from '../../../../interfaces/menu.interface';
import { DeleteMenuService } from '../../../../services/menu/delete-menu.service';
import { GetAllMenuService } from '../../../../services/menu/get-all-menu.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-menu-table',
  imports: [CommonModule],
  templateUrl: './menu-table.component.html',
  styleUrl: './menu-table.component.scss'
})
export class MenuTableComponent implements OnInit {

  protected menus!: Observable<IMenu[]> 
  private menusSubject = new BehaviorSubject<IMenu[]>([]);
  private deleteMenuService= inject(DeleteMenuService);
  private getAllMenuService = inject(GetAllMenuService);


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.menus = this.menusSubject.asObservable();
    this.loadMenus();
  }

  loadMenus() {
   this.getAllMenuService.execute().subscribe((data) => {
     this.menusSubject.next(data);  
  });
  }

  hasDishes(menu: IMenu): string {
      return (menu.dishes && menu.dishes.length > 0) ? 'Platillos incluidos:' : 'Sin platillos asociados';
    }
  
  goToEditMenu(menuId: number): void {
    this.router.navigate([`/edit-menu/${menuId}`]);
  }

  deleteMenu(menuId: number): void {
    if (confirm('¿Seguro que deseas eliminar este menú?')) {
      this.deleteMenuService.execute(menuId).subscribe({
        next: () => {
          const updatedMenus = this.menusSubject.getValue().filter(menu => menu.id !== menuId);
          this.menusSubject.next(updatedMenus);
        },
        error: (e) => {
          console.error('Error al eliminar el menú:', e);
        }
      })
    }
  }

}