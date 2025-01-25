import { Component } from '@angular/core';

@Component({
  selector: 'app-general-metrics',
  imports: [],
  templateUrl: './general-metrics.component.html',
  styleUrl: './general-metrics.component.scss'
})
export class GeneralMetricsComponent {

  public clientes = [
    {
      name: 'sebastian',
      date: '2022-04-01'
    },
    {
      name: 'Sofia',
      date: '2022-01-02'
    },
    {
      name: 'carlos',
      date: '2024-03-02'
    },
    {
      name: 'ana',
      date: '2022-04-02'
    },
    {
      name: 'ana',
      date: '2022-04-02'
    },
    {
      name: 'vanesa',
      date: '2022-05-22'
    }
  ]

}
