import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HeroComponent } from '../hero/hero.component';
import { MenusService } from '../../../services/menu/menus.service';
import { map, timeout } from 'rxjs';
import { DishService } from '../../../services/dish/dish.service';
import { OrderService } from '../../../services/order/order.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [HeroComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class DashboardComponent {
  title = 'home';
  totalPedidos = 200;
  totalIngresos = 35000;
  clientesFrecuentes = 50;
  platosPopulares = 8;
  topClientes: any[] = [];

  ngOnInit(): void {
    this.getTop5Dish();
    this.getOrdersPerWeekOfMonth();
    this.getTopClients();
    setTimeout(() => {
      this.renderTopDishesChart();
    }, 1000);
  }

  topDishes: any[] = [];
  ordersPerWeek: any[] = [];

  public menu = inject(MenusService);
  public order = inject(OrderService);

  getTopClients(): void {
    this.order.getOrders().subscribe({
      next: (data) => {
        const clientsMap = new Map<
          number,
          { id: number; name: string; orderCount: number; totalPrice: number }
        >();

        data.forEach((order) => {
          const clientId = order.client.id;
          const clientName = order.client.name;
          const orderTotal = order.totalPrice;
          if (clientsMap.has(clientId)) {
            const client = clientsMap.get(clientId)!;
            client.totalPrice += orderTotal;
            client.orderCount += 1;
          } else {
            clientsMap.set(clientId, {
              id: clientId,
              name: clientName,
              orderCount: 1,
              totalPrice: orderTotal,
            });
          }
        });
        const sortedClients = Array.from(clientsMap.values()).sort(
          (a, b) => b.totalPrice - a.totalPrice
        );
        const topClients = sortedClients.slice(0, 10).map(
          (client) => ({
            ...client,
            totalPrice: parseFloat(client.totalPrice.toFixed(2)),
          })
        );
        this.topClientes = topClients;
        console.log(topClients);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getTop5Dish(): void {
    this.menu
      .getMenus()
      .pipe(
        map((menus: any[]) => {
          const allDishes = menus.flatMap((menu) => menu.dishfoods);
          const dishesWithSales = allDishes.map((dish) => ({
            name: dish.name,
            totalVentas: dish.orderList.length,
          }));
          const sortedDishes = dishesWithSales.sort(
            (a, b) => b.totalVentas - a.totalVentas
          );
          return sortedDishes.slice(0, 5);
        })
      )
      .subscribe({
        next: (top5Dishes) => {
          console.log('Top 5 platos mas vendidos:', top5Dishes);
          this.topDishes = top5Dishes;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  getOrdersPerWeekOfMonth(): void {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    this.order
      .getOrders()
      .pipe(
        map((orders) =>
          orders.filter((order) => {
            const orderDate = new Date(order.localDate);
            return (
              orderDate.getMonth() === currentMonth &&
              orderDate.getFullYear() === currentYear
            );
          })
        ),
        map((filteredOrders) => {
          const ordersByWeek: { [key: number]: number } = {};

          filteredOrders.forEach((order) => {
            const orderDate = new Date(order.localDate);
            const week = Math.ceil(orderDate.getDate() / 7);
            ordersByWeek[week] = (ordersByWeek[week] || 0) + 1;
          });

          return Object.entries(ordersByWeek).map(([week, totalOrder]) => ({
            week: Number(week),
            totalOrder,
          }));
        })
      )
      .subscribe({
        next: (ordersByWeek) => {
          console.log('ordenes por semana del mes actual:', ordersByWeek);
          this.ordersPerWeek = ordersByWeek;
          this.renderOrdersPerMonthChart();
        },
        error: (error) => {
          console.error('Error al obtener ordenes por semana:', error);
        },
      });
  }

  renderTopDishesChart() {
    const ctx = document.getElementById('topDishesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.topDishes.map((dish) => dish.name),
        datasets: [
          {
            label: 'Ventas',
            data: this.topDishes.map((dish) => dish.totalVentas),
            backgroundColor: 'rgba(225, 108, 36, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  }

  renderOrdersPerMonthChart() {
    console.log(this.ordersPerWeek);

    const ctx = document.getElementById(
      'ordersPerMonthChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.ordersPerWeek.map((order) => `Week ${order.week}`),
        datasets: [
          {
            label: 'Orders',
            data: this.ordersPerWeek.map((order) => order.totalOrder),
            backgroundColor: 'rgb(83, 81, 199)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,

        hover: {
          mode: 'nearest',
          intersect: true,
        },
      },
    });
  }
}
