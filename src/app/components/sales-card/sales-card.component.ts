import { Component, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-sales-card',
  templateUrl: './sales-card.component.html',
  styleUrls: ['./sales-card.component.scss'],
})
export class SalesCardComponent implements AfterViewInit, OnDestroy {
  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() description: string = '';
  @Input() chartId: string = `chart-${Math.random().toString(36).substr(2, 9)}`; // ID único dinámico

  private chartInstance: Chart | null = null;

  ticks = [
    { day: 'MON', thisWeek: 24, prevWeek: 20 },
    { day: 'TUE', thisWeek: 18, prevWeek: 22 },
    { day: 'WED', thisWeek: 16, prevWeek: 30 },
    { day: 'THU', thisWeek: 18, prevWeek: 22 },
    { day: 'FRI', thisWeek: 24, prevWeek: 18 },
    { day: 'SAT', thisWeek: 36, prevWeek: 22 },
    { day: 'SUN', thisWeek: 28, prevWeek: 30 },
  ];

  ngAfterViewInit(): void {
    this.renderOrdersPerMonthChart();
  }

  ngOnDestroy(): void {
    // Destruir el gráfico al desmontar el componente
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  renderOrdersPerMonthChart() {
    const multiply = {
      id: 'multiply',
      beforeDatasetsDraw(chart: Chart) {
        chart.ctx.globalCompositeOperation = 'multiply';
      },
      afterDatasetsDraw(chart: Chart) {
        chart.ctx.globalCompositeOperation = 'source-over';
      },
    };
    const canvas = document.getElementById(this.chartId) as HTMLCanvasElement;
    if (!canvas) {
      console.error(`Canvas with ID ${this.chartId} not found`);
      return;
    }

    const ctx = canvas.getContext('2d')!;
    const gradientThisWeek = ctx.createLinearGradient(0, 0, 0, 150);
    gradientThisWeek.addColorStop(0, '#5555FF');
    gradientThisWeek.addColorStop(1, '#9787FF');

    const gradientPrevWeek = ctx.createLinearGradient(0, 0, 0, 150);
    gradientPrevWeek.addColorStop(0, '#FF55B8');
    gradientPrevWeek.addColorStop(1, '#FF8787');

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [
          {
            label: 'This week',
            data: this.ticks.map((t) => t.thisWeek),
            backgroundColor: gradientThisWeek,
            borderColor: '#fff',
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Previous week',
            data: this.ticks.map((t) => t.prevWeek),
            backgroundColor: gradientPrevWeek,
            borderColor: '#fff',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        elements: {
          point: { radius: 0, hitRadius: 1, hoverRadius: 1 },
        },
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      },
      plugins: [multiply],
    });
  }
}
