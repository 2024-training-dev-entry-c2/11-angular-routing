import { Component, Input } from '@angular/core';
import { ConfirmModelComponent } from '../../confirm-model/confirm-model.component';
import { Router } from '@angular/router';
import { IDish } from '../../../../interfaces/dishResponse.interface';
import { BtnsActionsComponent } from '../../../custom/btns-actions/btns-actions.component';
import { DeleteDishService } from '../../../../services/dish/delete-dish.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dish-card',
  imports: [ConfirmModelComponent, BtnsActionsComponent, CurrencyPipe],
  templateUrl: './dish-card.component.html',
  styleUrl: './dish-card.component.scss',
})
export class DishCardComponent {
  @Input() dish!: IDish;
  isModalOpen = false;

  constructor(
    private router: Router,
    private deleteDishService: DeleteDishService
  ) {}

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmDelete(): void {
    this.deleteDishService.deleteDish(this.dish.id).subscribe(() => {
      this.closeModal();
    });
  }

  editDish(): void {
    this.router.navigate(['dish/edit', this.dish.id]);
  }
}
