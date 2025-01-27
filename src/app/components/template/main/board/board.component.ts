import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-board',
  imports: [RouterLink],
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
