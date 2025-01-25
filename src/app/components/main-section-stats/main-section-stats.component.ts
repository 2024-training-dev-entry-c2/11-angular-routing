import { Component, OnInit, OnDestroy } from '@angular/core';
import { forkJoin, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getMenusService } from '../../services/menus.service';
import { getOrderService } from '../../services/orders.service';
import { getClientsService } from '../../services/clients.service';
import { getDishService } from '../../services/dishes.service';

@Component({
  selector: 'app-main-section-stats',
  templateUrl: './main-section-stats.component.html',
  styleUrls: ['./main-section-stats.component.scss'],
})
export class MainSectionStatsComponent implements OnInit, OnDestroy {
  public data: any = {
    orders: [],
    menus: [],
    clients: [],
    dishes: [],
  };

  private subscription: Subscription = new Subscription();

  constructor(
    private ordersService: getOrderService,
    private menusService: getMenusService,
    private clientsService: getClientsService,
    private dishesService: getDishService
  ) {}

  ngOnInit(): void {
    // Realizar todas las solicitudes en paralelo
    const requests = forkJoin({
      orders: this.ordersService.getData().pipe(catchError(() => of([]))),
      menus: this.menusService.getData().pipe(catchError(() => of([]))),
      clients: this.clientsService.getData().pipe(catchError(() => of([]))),
      dishes: this.dishesService.getData().pipe(catchError(() => of([]))),
    });

    // Suscribirse a las respuestas combinadas
    this.subscription = requests.subscribe((response) => {
      this.data.orders = response.orders;
      this.data.menus = response.menus;
      this.data.clients = response.clients;
      this.data.dishes = response.dishes;

      console.log('Orders:', this.data.orders);
      console.log('Menus:', this.data.menus);
      console.log('Clients:', this.data.clients);
      console.log('Dishes:', this.data.dishes);
    });
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.subscription.unsubscribe();
  }
}
