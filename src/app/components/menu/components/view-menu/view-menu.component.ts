import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { IMenu } from '@interfaces/menu.interface';
import { MenuService } from '@services/menu/menu.service';
import { BehaviorSubject } from 'rxjs';
import { CardMenuComponent } from '../card-menu/card-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-menu',
  imports: [CommonModule, CardMenuComponent],
  templateUrl: './view-menu.component.html',
  styleUrl: './view-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewMenuComponent implements OnInit {
  menuService = inject(MenuService);
  menus = new BehaviorSubject<IMenu[]>([]);
  router = inject(Router);

  changesOnMenu = signal<boolean>(false);

  constructor(){
    effect(() => {
      if(this.changesOnMenu()){
        this.loadMenus();
      }
    })
  }

  ngOnInit(): void {
    this.loadMenus();
    this.menuService.menuObserver.subscribe(event => this.changesOnMenu.set(event));
  }

  loadMenus(){
    this.menuService.findAll().subscribe(data => this.menus.next(data));
  }

  createMenu(){
    this.router.navigate([`/dashboard/menu/create`]);
  }
}
