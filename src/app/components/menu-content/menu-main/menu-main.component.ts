import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-main',
  imports: [RouterLink],
  templateUrl: './menu-main.component.html',
  styleUrl: './menu-main.component.scss'
})
export class MenuMainComponent {
  menus = [
    { id: 1, name: 'Primaveral', dishes: ['Pasta con champiñones', 'Ensalada fresca'] },
    { id: 2, name: 'Ensaladitas', dishes: ['Ensalada César', 'Ensalada griega'] },
    { id: 3, name: 'En el mar', dishes: ['Ceviche', 'Camarones al ajillo'] },
    { id: 4, name: 'Invernal', dishes: ['Sopa de tomate', 'Guiso de lentejas'] }
  ];

  actions = [
    { label: 'Editar', link: '/edit', type: 'edit', icon: 'svg/edit.svg#edit' },
    { label: 'Eliminar', link: '/delete', type: 'delete', icon: 'svg/delete.svg#delete' }
  ];

  getMenuItems() {
    return this.menus;
  }

  getActions() {
    return this.actions;
  }


  toggleAccordion(event: Event) {
    const button = event.target as HTMLElement;
    button.classList.toggle('active'); 
    const panel = button.nextElementSibling as HTMLElement; 

    if (panel.style.maxHeight) {
      panel.style.maxHeight = '';

    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px'; 
    }
  }
}
