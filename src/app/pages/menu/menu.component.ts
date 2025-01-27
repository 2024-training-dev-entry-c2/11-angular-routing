import { Component, inject, OnInit } from '@angular/core';
import { SimpleCardComponent } from '../../components/card/simple-card/simple-card.component';
import { MenuService } from '../../services/menu.service';
import { FormMenuComponent } from '../../components/forms/form-menu/form-menu.component';
import { IMenu } from '../../interfaces/menu/menu.interface';

@Component({
  selector: 'app-menu',
  imports: [SimpleCardComponent, FormMenuComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  private menuServices = inject(MenuService);
  public menuSelected: IMenu = {
    id: null,
    nombre: '',
    urlImage: '',
  };
  menu: any = [];

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu() {
    this.resetSelected();
    this.menuServices.getAll().subscribe((res) => (this.menu = res));
  }

  addOrUpdate(menu: IMenu) {
    if (this.menuSelected.nombre == '' && this.menuSelected.urlImage == '') {
      this.addMenu(menu);
    } else {
      this.updateMenu(menu);
    }
  }

  addMenu(menu: IMenu) {
    this.menuServices.post(menu).subscribe((_) => this.getMenu());
  }

  updateMenu(menu: IMenu) {
    this.menuServices.update(menu).subscribe((_) => this.getMenu());
  }

  deleteMenu(id: number) {
    this.menuServices.deleteById(id).subscribe((_) => this.getMenu());
    console.log(id + ' delete menu');
  }

  selectMenuToUpdate(menu: IMenu) {
    this.menuSelected = menu;
  }

  resetSelected(): void {
    this.menuSelected = {
      id: null,
      nombre: '',
      urlImage: '',
    };
  }
}
