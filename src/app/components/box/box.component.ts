import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClientService } from '../../core/services/client.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-box',
  imports: [MatIconModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss',
})
export class BoxComponent implements OnInit {
  public clientes: number = 0;

  constructor(private clientService: ClientService) {}
  ngOnInit(): void {
    this.clientService.clientes
      .pipe(tap((users) => (this.clientes = users.length)))
      .subscribe();
    this.clientService.getClients();
  }
}
