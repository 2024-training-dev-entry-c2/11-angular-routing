import { Component, Input } from '@angular/core';
import { IMenu } from '../../../../interfaces/menuResponse.interface';
import { DeleteMenuService } from '../../../../services/menu/delete-menu.service';
import { Router } from '@angular/router';
import { BtnsActionsComponent } from '../../../custom/btns-actions/btns-actions.component';
import { ConfirmModelComponent } from '../../confirm-model/confirm-model.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-menu-card',
  imports: [BtnsActionsComponent, ConfirmModelComponent, CurrencyPipe],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.scss',
})
export class MenuCardComponent {
  @Input() menu!: IMenu;
  isModalOpen = false;

  constructor(
    private router: Router,
    private deleteMenuService: DeleteMenuService
  ) {}

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this.deleteMenuService.deleteMenu(this.menu.id).subscribe(() => {
      this.closeModal();
    });
  }

  editMenu(): void {
    this.router.navigate(['menu/edit', this.menu.id]);
  }
}
