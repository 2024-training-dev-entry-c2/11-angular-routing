import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICustomer } from '@interfaces/customer.interface';
import { IDish } from '@interfaces/dish.interface';
import { Observable } from 'rxjs';
import { ContainerCardComponent } from './components/container-card/container-card.component';

@Component({
  selector: 'app-container',
  imports: [CommonModule, ContainerCardComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {

  @Input() columns: string[] = [];
  @Input() customers?: Observable<ICustomer[]>;
  @Input() dishes?: Observable<IDish[]>;
  @Input({transform: booleanAttribute}) isCustomers: boolean = false;
  @Input({transform: booleanAttribute}) isDishes: boolean = false;


}
