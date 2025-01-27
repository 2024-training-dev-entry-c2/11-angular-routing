import { Component, inject, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../notification/services/notification.service';

@Component({
  selector: 'app-dish-delete',
  imports: [],
  template: '',
  styles: ''
})
export class DishDeleteComponent implements OnInit {

  private dishService = inject(DishService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  public idDish: number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.idDish = +idParam;
      }
      this.deleteDish(this.idDish);
    });
  }

  private deleteDish(id: number): void {
    this.dishService.delete(id).subscribe({
      next: () => {
        this.notificationService.setNotification('success', 'Plato eliminado exitosamente.');
        this.router.navigate(['platos']); 
      },
      error: (err) => {
        console.error('Error al eliminar plato', err);
        this.notificationService.setNotification('error', 'Error al eliminar el plato.');
      },
    });
  }

}
