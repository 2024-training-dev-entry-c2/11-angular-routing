import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HeroComponent } from '../hero/hero.component';
@Component({
  selector: 'app-dashboard',
  imports: [HeroComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class DashboardComponent {
  title = 'home';
  totalPedidos = 200;
  totalIngresos = 35000;
  clientesFrecuentes = 50;
  platosPopulares = 8;

  topClientes = [
    { nombre: 'Juan Pérez', pedidos: 10, totalGastado: 500 },
    { nombre: 'María López', pedidos: 8, totalGastado: 400 },
    { nombre: 'Carlos Sánchez', pedidos: 7, totalGastado: 350 },
    { nombre: 'Ana Gómez', pedidos: 6, totalGastado: 300 },
    { nombre: 'Luis Torres', pedidos: 5, totalGastado: 250 },
  ];
  ngOnInit(): void {
    this.renderTopDishesChart();
    this.renderOrdersPerMonthChart();
  }

  renderTopDishesChart() {
    const ctx = document.getElementById('topDishesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Pizza', 'Hamburguesa', 'Pasta', 'Tacos', 'Sushi'],
        datasets: [
          {
            label: 'Ventas',
            data: [50, 40, 30, 25, 20],
            backgroundColor: 'rgba(225, 108, 36, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        elements: {
          point: { radius: 0, hitRadius: 1, hoverRadius: 1 },
        },
        plugins: {
          legend: { display: false },
        },
       hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          x: { display: false },
          y: { display: false },
        }
      },
    });
  }

  renderOrdersPerMonthChart() {
    const ctx = document.getElementById(
      'ordersPerMonthChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
          {
            label: 'Órdenes',
            data: [30, 40, 50, 60, 70, 80],
            backgroundColor: 'rgb(83, 81, 199)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
          },
        ],
      },
    });
  }
}
