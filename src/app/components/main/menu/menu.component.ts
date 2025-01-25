import { Component, OnInit } from '@angular/core';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { TitleComponent } from '../../custom/title/title.component';
import { IMenu } from '../../../interfaces/menuResponse.interface';
import { GetAllMenuService } from '../../../services/menu/get-all-menu.service';
import { AddComponent } from '../../custom/add/add.component';
import { interval, Subscription, switchMap } from 'rxjs';
import { NoDataComponent } from '../../custom/no-data/no-data.component';

@Component({
  selector: 'app-menu',
  imports: [MenuCardComponent, TitleComponent, AddComponent, NoDataComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  menus: IMenu[] = [];
  title = 'Menus ';
  addLink = '/menu/add';
  private refreshSubscription!: Subscription;

  constructor(private getAllMenusService: GetAllMenuService) {}

  ngOnInit(): void {
    this.refreshSubscription = interval(100)
      .pipe(switchMap(() => this.getAllMenusService.execute()))
      .subscribe({
        next: (data) => (this.menus = data),
        error: (err) => console.error('Error fetching menus:', err),
      });
  }

  trackByFn(index: number, menu: IMenu): number {
    return menu.id;
  }
  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
