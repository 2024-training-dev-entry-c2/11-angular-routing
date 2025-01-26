import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  public titles = input<string[]>();
  public items = input<string[][]>();
  public onDelete = output<string>();
  public onUpdate = output<string>();

  sendOnDelete(id: string):void {
    this.onDelete.emit(id);
  }

  sendOnUpdate(id: string):void {
    this.onUpdate.emit(id);
  }
}
