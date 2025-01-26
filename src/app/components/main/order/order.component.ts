import { Component } from '@angular/core';
import { IOrderResponse } from '../../../interfaces/orderResponese.interface';
import { TitleComponent } from '../../custom/title/title.component';
import { AddComponent } from '../../custom/add/add.component';
import { interval, Subscription, switchMap } from 'rxjs';
import { GetAllOrderService } from '../../../services/order/get-all-order.service';
import { OrderCardComponent } from './order-card/order-card.component';
import { NoDataComponent } from '../../custom/no-data/no-data.component';
import { HamburguerImgComponent } from '../../custom/hamburguer-img/hamburguer-img.component';

@Component({
  selector: 'app-order',
  imports: [
    TitleComponent,
    AddComponent,
    OrderCardComponent,
    NoDataComponent,
    HamburguerImgComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  orders: IOrderResponse[] = [];
  title = 'Orders ';
  addLink = '/order/add';
  private refreshSubscription!: Subscription;
  srcImage = 'checkout.png';
  altImage = 'checkout';
  titleImage = 'Checkouts';

  constructor(private getAllOrderService: GetAllOrderService) {}

  ngOnInit(): void {
    this.refreshSubscription = interval(500)
      .pipe(switchMap(() => this.getAllOrderService.execute()))
      .subscribe({
        next: (data) => (this.orders = data),
        error: (err) => console.error('Error fetching menus:', err),
      });
  }

  trackByFn(index: number, order: IOrderResponse): number {
    return order.id;
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
