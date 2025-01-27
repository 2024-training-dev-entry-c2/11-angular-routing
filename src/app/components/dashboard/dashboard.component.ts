import { Component } from '@angular/core';
import { TransactionsComponent } from '../transactions/transactions.component';

@Component({
  selector: 'app-dashboard',
  imports: [TransactionsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
