import { AfterViewInit, Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { SalesCardComponent } from '../../../components/sales-card/sales-card.component';
import { MenusService } from '../../../services/menu/menus.service';
import { OrderService } from '../../../services/order/order.service';
import { combineLatest, map } from 'rxjs';
declare const Swiper: any;
@Component({
  selector: 'app-hero',
  imports: [SalesCardComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit, OnInit{
  cards = ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6', 'Card 7', 'Card 8'];
  currentPosition = 0;
  cardWidth = 0;
  visibleCards = 3;
  ticks: any[] = [];



  ngAfterViewInit() {
    this.updateCardWidth();
  }

  @HostListener('window:resize')
  updateCardWidth() {
    const cardElement = document.querySelector('.card') as HTMLElement;
    if (cardElement) {
      this.cardWidth = cardElement.offsetWidth +16;
      this.correctPosition();
    }
  }


  correctPosition() {
    const maxPosition = -(this.cards.length - this.visibleCards) * this.cardWidth;
    if (this.currentPosition < maxPosition) {
      this.currentPosition = maxPosition;
    } else if (this.currentPosition > 0) {
      this.currentPosition = 0;
    }
  }

  nextSlide() {
    const maxPosition = -(this.cards.length - this.visibleCards) * this.cardWidth;
    if (this.currentPosition > maxPosition) {
      this.currentPosition -= this.cardWidth;
    }
  }

  prevSlide() {
    if (this.currentPosition < 0) {
      this.currentPosition += this.cardWidth;
    }
  }
  public menu= inject(MenusService);
  public order= inject(OrderService);


  ngOnInit(): void {
    combineLatest([
      this.menu.getMenus(),  
      this.order.getOrders()  
    ]).pipe(
      map(([menus, orders]) => {
        const thisWeek = this.getWeekData(orders, menus, 0); 
        const prevWeek = this.getWeekData(orders, menus, -7); 
        return this.mergeWeeksData(thisWeek, prevWeek);
      })
    ).subscribe({
      next: (ticks) => {
        this.ticks = ticks; 
        console.log(this.ticks);    
      },
      error: (error) => {
        console.error(error);
      }
    });
    
  }

  getWeekData(orders: any[], menus: any[], daysOffset: number): any {
    const today = new Date();
    today.setDate(today.getDate() + daysOffset);  

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); 

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); 

    // Filtrar las órdenes de la semana actual
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.localDate);
      return orderDate >= startOfWeek && orderDate <= endOfWeek;
    });

    return menus.map(menu => {
      const sales = Array(7).fill(0); 
      menu.dishfoods.forEach((dish :any) => {
        filteredOrders.forEach(order => {
          if (order.dishfoodIds.includes(dish.id)) {
            const orderDate = new Date(order.localDate);
            const dayOfWeek = orderDate.getDay();  
            sales[dayOfWeek] += dish.orderList.length;  
          }
        });
      });

      return {
        menu: menu.name,
        sales
      };
    });
  }


  mergeWeeksData(thisWeek: any[], prevWeek: any[]): any[] {
    return thisWeek.map((menuData, index) => {
      const prevSales = prevWeek[index]?.sales || Array(7).fill(0);
      return {
        menu: menuData.menu,
        ticks: menuData.sales.map((sales:any, dayIndex:any) => {
          return {
            day: this.getDayName(dayIndex),
            thisWeek: sales,
            prevWeek: prevSales[dayIndex]
          };
        })
      };
    });
  }

  getDayName(dayIndex: number): string {
    const daysOfWeek = [ 'Mon', 'Tus', 'Wed', 'Thr', 'Fry', 'Sat','Sun'];
    return daysOfWeek[dayIndex];
  }
}
