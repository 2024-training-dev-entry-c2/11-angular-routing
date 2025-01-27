import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from '@interfaces/customer.interface';
import { CustomersService } from '@services/customer/customers.service';
import { ContainerComponent } from '@shared/container/container.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-view-customer',
  imports: [ContainerComponent],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCustomerComponent implements OnInit {
  customerService = inject(CustomersService);
  customers = new BehaviorSubject<ICustomer[]>([]);
  headers: string[] = ['id', 'nombre', 'correo', 'tipo de cliente', 'telefono'];

  router = inject(Router);
  changes = signal<boolean>(false);
  constructor(){
    effect(() => {
      if(this.changes()){
        this.loadCustomers();
      }
    })

  }
  ngOnInit(): void {
    this.loadCustomers();
    this.customerService.customerObserver.subscribe(event => this.changes.set(event));
  }

  loadCustomers(){
    this.customerService.findAll().subscribe(data => this.customers.next(data));
  }

  createCustomer(){
    this.router.navigate(['/dashboard/customer/create']);
  }
}
