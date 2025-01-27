import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuCardComponent } from '../../molecules/menu-card/menu-card.component';
import { IMenuResponse } from '../../../services/menu/interfaces/menu-interface';

@Component({
  selector: 'app-menu-list',
  imports: [NgFor, MenuCardComponent],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss',
})
export class MenuListComponent {
  @Input() menus: IMenuResponse[] = [];
  @Output() menuDeleted = new EventEmitter<void>();

  onMenuDeleted() {
    this.menuDeleted.emit();
  }
}
