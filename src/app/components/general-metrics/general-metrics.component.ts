import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../core/services/client.service';
import { Iclient } from '../../interfaces/client/client';
import { filter, map, tap } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-general-metrics',
  imports: [DatePipe],
  templateUrl: './general-metrics.component.html',
  styleUrl: './general-metrics.component.scss',
})
export class GeneralMetricsComponent implements OnInit {
  public clientes: Iclient[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.clientes
      .pipe(map((users) => users.slice(0, 5)))
      .subscribe((result) => (this.clientes = result));
    this.clientService.getClients();
  }
}
