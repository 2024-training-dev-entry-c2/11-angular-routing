import { Component, Input, input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-sales-card',
  imports: [],
  templateUrl: './sales-card.component.html',
  styleUrl: './sales-card.component.scss'
})
export class SalesCardComponent {

  @Input() title: string='';
  @Input() subTitle: string='';
  @Input() description: string='';


  ticks = [
    { day: 'MON', thisWeek: 24, prevWeek: 20 },
    { day: 'TUE', thisWeek: 18, prevWeek: 22 },
    { day: 'WED', thisWeek: 16, prevWeek: 30 },
    { day: 'THU', thisWeek: 18, prevWeek: 22 },
    { day: 'FRI', thisWeek: 24, prevWeek: 18 },
    { day: 'SAT', thisWeek: 36, prevWeek: 22 },
    { day: 'SUN', thisWeek: 28, prevWeek: 30 },
  ];

  ngOnInit(): void {
    this.renderOrdersPerMonthChart();
  }

  renderOrdersPerMonthChart() {
    const multiply = {
      id: 'multiply',
      beforeDatasetsDraw(chart: Chart) {
        chart.ctx.globalCompositeOperation = 'multiply';
      },
      afterDatasetsDraw(chart: Chart) {
        chart.ctx.globalCompositeOperation = 'source-over';
      }
    };

    const canvas = document.getElementById('ordersPerMonthChart') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    const gradientThisWeek = ctx.createLinearGradient(0, 0, 0, 150);
    gradientThisWeek.addColorStop(0, '#5555FF');
    gradientThisWeek.addColorStop(1, '#9787FF');

    const gradientPrevWeek = ctx.createLinearGradient(0, 0, 0, 150);
    gradientPrevWeek.addColorStop(0, '#FF55B8');
    gradientPrevWeek.addColorStop(1, '#FF8787');
    new Chart(ctx, {
      type: 'line', // Cambiado de 'bar' a 'line'
      data: {
        labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
        datasets: [
          {
            label: 'This week',
            data: [24, 18, 16, 18, 24, 36, 28],
            backgroundColor: gradientThisWeek, // Color de fondo (para el área debajo de la línea)
            borderColor: '#fff', // Color de la línea
            fill: true, // Llenar el área debajo de la línea
            tension: 0.4, // Opcional: suaviza la línea

          },
          {
            label: 'Previous week',
            data: [25, 20, 25, 25, 24, 22, 28],
            backgroundColor: gradientPrevWeek,
            borderColor: '#fff', // Color de la línea
            fill: true, // Llenar el área debajo de la línea
            tension: 0.4, // Opcional: suaviza la línea
        }
        ],
      },
      options: {
        elements: { point: { radius: 0, hitRadius: 1, hoverRadius: 1 } },
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
      plugins: [multiply]

    });


  
}
}
