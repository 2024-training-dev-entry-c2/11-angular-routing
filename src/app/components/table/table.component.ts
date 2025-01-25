import { Component, input, output } from '@angular/core';
import { IColumn } from './interfaces/column.interface';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  public title = input<string>();
  public columns = input<IColumn[]>();
  public data = input<any[]>();
  public idUpdate = output<number>();
  public idDelete = output<number>();


  sendEdit(number: number) {
    this.idUpdate.emit(number);
  }

  sendDelete(number: number) {
    this.idDelete.emit(number);
  }
}
