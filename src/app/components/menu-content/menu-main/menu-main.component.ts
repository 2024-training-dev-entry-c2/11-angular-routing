import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { IDish, IMenu } from '../../../interfaces/menu.interface';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-main',
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.scss']
})
export class MenuMainComponent implements OnInit {
  menus: IMenu[] = []; 
  modalType: string = '';
  menuName: string = '';
  dishes: IDish[] = [];
  selectedMenuId: number | null = null;

  actions = [
    { label: 'Editar', link: '/edit', type: 'edit', icon: 'svg/edit.svg#edit' },
    { label: 'Eliminar', link: '/delete', type: 'delete', icon: 'svg/delete.svg#delete' }
  ];

  constructor(private menuService: MenuService, 
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.menuService.getMenus().subscribe(
      (menus) => {
        this.menus = menus;
      },
      (error) => {
        console.error('Error loading menus', error);
      }
    );
  }

  getHeaders() {
    return [
      { label: 'Menu ID' },
      { label: 'Nombre del Menu' },
      { label: 'Detalles' },
      { label: 'Acciones' }
    ];
  }

  getActions() {
    return this.actions;
  }

  toggleAccordion(event: Event): void {
    const button = event.target as HTMLElement;
    button.classList.toggle('active');
    const panel = button.nextElementSibling as HTMLElement;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = '';
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

  openModal(modalTemplate: TemplateRef<any>, type: string, id: number): void {
    this.modalType = type;
    this.selectedMenuId = id;
    
    if (type === 'edit') {
      this.loadMenuDetails(id);
    }
    
    this.modalService
      .open(modalTemplate, this.viewContainerRef, {
        title: type === 'edit' ? 'Editar Menu' : 'Eliminar Menú',
        buttonName: 'Confirmar',
      })
      .subscribe(() => {
        if (type === 'edit' && this.selectedMenuId) {
          const updatedMenu: IMenu = { 
            idMenu: this.selectedMenuId, 
            menuName: this.menuName, 
            dishes: this.dishes, // Los platos permanecen igual
          };
          this.updateMenu(this.selectedMenuId, updatedMenu);
        } else if (type === 'delete' && this.selectedMenuId) {
          this.deleteMenu(this.selectedMenuId);
        }
      });
  }

  loadMenuDetails(id: number): void {
    this.menuService.getMenuById(id).subscribe(
      (menu) => {
        this.menuName = menu.menuName;
        this.dishes = menu.dishes;
      },
      (error) => {
        console.error('Error loading menu details', error);
      }
    );
  }

  deleteMenu(id: number): void {
    this.menuService.deleteMenu(id).subscribe(
      () => {
        console.log('Menu deleted');
        this.loadMenus();
      },
      (error) => {
        console.error('Error deleting menu', error);
      }
    );
  }

  updateMenu(id: number, updatedMenu: IMenu): void {
    this.menuService.updateMenu(id, updatedMenu).subscribe(
      () => {
        console.log('Menu updated');
        this.loadMenus();
      },
      (error) => {
        console.error('Error updating menu', error);
      }
    );
  }
}
