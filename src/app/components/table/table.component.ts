import { Component, input, output } from '@angular/core';
import { IColumn } from '../../interfaces/column-table.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  public title = input<string>();
  public columns = input<IColumn[]>();
  public data = input<any[]>();
  public update = output<number>();
  public delete = output<number>();
  public openModal = output<boolean>();


  sendEdit(number: number) {
    this.update.emit(number);
  }

  sendDelete(number: number) {
    this.delete.emit(number);
  }

  public openForm() {
    this.openModal.emit(true);
  }

  resolveField(obj: any, path: string): any {
    if (!path) return null;
    const value = path.split('.').reduce((acc, key) => acc && acc[key], obj);
  
    if (Array.isArray(value)) {
      if (path === 'dishes') {
        return value.map(item => item.name).join(', ');
      }
    }
  
    return value;
  }
  
}
