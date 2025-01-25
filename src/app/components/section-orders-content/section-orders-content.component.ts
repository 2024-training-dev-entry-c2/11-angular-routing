import { Component, inject, input } from '@angular/core';
import { MainSectionOrdersComponent } from "../main-section-orders/main-section-orders.component";
import { getOrderService } from '../../services/orders.service';
import { IOrders } from '../../interface/orders.interface';
import { IMenu } from '../../interface/menus.interface';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-section-orders-content',
  imports: [MainSectionOrdersComponent],
  templateUrl: './section-orders-content.component.html',
  styleUrl: './section-orders-content.component.scss'
})
export class SectionOrdersContentComponent {
  data: IOrders[] = [];
  public orderData = input<any>();

  public tableContent = {
    headers: ['Order ID', 'Order Date', 'Price', 'Menu ID', 'Client Email', 'Ordered Dishes' , 'Actions'],

  }


  private ordersService = inject(getOrderService);

  ngOnInit(): void {
      this.ordersService
        .getData()
        .pipe(
          map((response) => response),
          catchError((error) => {
            console.error('Error fetching data:', error);
            return of([]); 
          })
        )
        .subscribe((response: IOrders[]) => {
          this.data = response; 
          console.log(this.data);
        });
    }
}
