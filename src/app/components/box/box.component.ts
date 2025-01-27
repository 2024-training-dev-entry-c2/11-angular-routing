import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClientService } from '../../core/services/client.service';
import { tap } from 'rxjs';
import { DishService } from '../../core/services/dish.service';

@Component({
  selector: 'app-box',
  imports: [MatIconModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss',
})
export class BoxComponent implements OnInit {
  public clientes: number = 0;
  public platos: number = 0;
  public menu: number = 0;
  public pedidos: number = 0;


  constructor(private clientService: ClientService, private dishService: DishService) {}
  ngOnInit(): void {
    this.dishService.dishes
      .pipe(tap((dishes) => (this.platos = dishes.length)))
      .subscribe();
    this.dishService.getDishes();

    this.clientService.clientes
      .pipe(tap((users) => (this.clientes = users.length)))
      .subscribe();
    this.clientService.getClients();
  }
}
