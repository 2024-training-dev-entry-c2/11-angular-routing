import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingComponent } from '../../atoms/heading/heading.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { ICustomerResponse } from '../../../services/customer/interfaces/customer-interface';

@Component({
  selector: 'app-customer-card',
  standalone: true,
  imports: [CommonModule, HeadingComponent, ButtonComponent],
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss'],
})
export class CustomerCardComponent {
  @Input() customer!: ICustomerResponse;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.customer.id);
  }

  onDelete() {
    this.delete.emit(this.customer.id);
  }
}