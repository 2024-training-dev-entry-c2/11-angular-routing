import { Component } from '@angular/core';
import { HeadingComponent } from "../../atoms/heading/heading.component";
import { ButtonComponent } from "../../atoms/button/button.component";
import { MenuListComponent } from "../../organisms/menu-list/menu-list.component";

@Component({
  selector: 'app-menu-page',
  imports: [HeadingComponent, ButtonComponent, MenuListComponent],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent {
  menus = [
    {
      title: 'Menú del Día',
      description: 'Incluye entrada, plato fuerte y postre.',
      dishesCount: 3,
    },
    {
      title: 'Menú Vegetariano',
      description: 'Delicias sin carne.',
      dishesCount: 4,
    },
  ];
}
