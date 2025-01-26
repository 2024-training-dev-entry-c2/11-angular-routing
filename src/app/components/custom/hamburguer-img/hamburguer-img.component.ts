import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hamburguer-img',
  templateUrl: './hamburguer-img.component.html',
  styleUrls: ['./hamburguer-img.component.scss'],
})
export class HamburguerImgComponent {
  @Input() src!: string;
  @Input() alt!: string;
  @Input() title!: string;
}
