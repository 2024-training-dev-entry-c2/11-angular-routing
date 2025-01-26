import { Component, input, output } from '@angular/core';
import { IColumn } from '../../interfaces/column-table.interface';

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
}
