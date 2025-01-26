import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MenuCardComponent } from "../../molecules/menu-card/menu-card.component";

@Component({
  selector: 'app-menu-list',
  imports: [NgFor, MenuCardComponent],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss',
})
export class MenuListComponent {
  @Input() menus: {
    title: string;
    description: string;
    dishesCount: number;
  }[] = [];
}
