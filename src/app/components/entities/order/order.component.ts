import { Component, inject } from '@angular/core';
import { BoardComponent } from '../../template/main/board/board.component';
import { ContainerComponent } from '../../template/main/container/container.component';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { GetOrdersService } from '../../../services/order/get-orders.service';
import { DeleteOrderService } from '../../../services/order/delete-order.service';
import { filter } from 'rxjs';
import { IOrderResponse } from '../../../interfaces/order/order.response.interfaz';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { OptionsComponent } from '../../template/main/options/options.component';

@Component({
  selector: 'app-order',
  imports: [ContainerComponent, BoardComponent, OptionsComponent, RouterOutlet],
  providers:[TitleCasePipe, CurrencyPipe, DatePipe],
  templateUrl: './order.component.html'
})
export class OrderComponent {
  tableContent:{ titles: string[]; content: string[][];} = { titles: [], content: [] };

  getOrdersService = inject(GetOrdersService);
  deleteOrderService = inject(DeleteOrderService);

  router = inject(Router);
  route = inject(ActivatedRoute);

  titlePipe = inject(TitleCasePipe);  
  currencyPipe = inject(CurrencyPipe);
  datePipe = inject(DatePipe);

  ngOnInit(){
    this.getData();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd ))
      .subscribe(() => {
        this.getData();
      });
  }

  getData(): void{
    this.getOrdersService.execute().subscribe((orders: IOrderResponse[])=>{
      this.transformOrderResponse(orders);
    })
  }

  private transformOrderResponse(orders: IOrderResponse[]): void {
    const titles = ['#', 'Fecha', 'Cliente', 'Platos', 'Total'];
    const content = orders.map(order =>[
      order.id.toString(),
      (this.datePipe.transform(order.date)?? '').toString(),
      this.titlePipe.transform(order.client.name),
      order.dishes.map(dish => `• ${this.titlePipe.transform(dish.dishName)} × ${dish.quantity}`).join('<br>'),
      (this.currencyPipe.transform(order.total, 'COP', 'symbol')?? '').toString()
    ]);

    this.tableContent={titles, content};
  }

  deleteOrder(id:string): void {
    this.deleteOrderService.execute(id).subscribe(()=>{
      this.getData();
    }     
    );
  }
}
