import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from '@interfaces/menu.interface';
import { MenuService } from '@services/menu/menu.service';
import { LinkComponent } from "@shared/link/link.component";


@Component({
  selector: 'app-card-menu',
  imports: [CommonModule, LinkComponent],
  templateUrl: './card-menu.component.html',
  styleUrl: './card-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardMenuComponent {

  @Input() menu: IMenu = {} as IMenu;
  router = inject(Router);

  menuService = inject(MenuService);

  createDish(){
    this.router.navigate([`/dashboard/dishes/create/${this.menu.id}`]);
  }

  updateMenu(){
    this.router.navigate([`/dashboard/menu/update/${this.menu.id}`]);
  }

  removeMenu(){
    this.menuService.remove(this.menu.id);
  }
}
