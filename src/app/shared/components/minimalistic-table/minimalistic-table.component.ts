import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-minimalistic-table',
  imports: [],
  templateUrl: './minimalistic-table.component.html',
  styleUrl: './minimalistic-table.component.scss'
})
export class MinimalisticTableComponent {

  @Input() columns: string[] = [];
  @Input() data: any[] = [];

}
