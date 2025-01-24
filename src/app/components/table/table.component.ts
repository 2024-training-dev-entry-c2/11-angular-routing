import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../interfaces/client.interface';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() isLoading: boolean = false;
  @Input() isError: string = '';
  @Output() deleteId = new EventEmitter<void>(); 

  images = [
  'assets/icons/form-svgrepo-com.svg#icon-delete',
  'assets/icons/form-svgrepo-com.svg#icon-update',
  ];

  get columnKeys(): string[] {
   
    return this.data.length > 0 ? Object.keys(this.data[0]) : [];
  }
  isArray(value: any): boolean {
    return Array.isArray(value);
  }
}
