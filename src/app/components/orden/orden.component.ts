import { Component } from '@angular/core';
import { GetOrdenComponent } from '../get-orden/get-orden.component';
import { AddOrdenComponent } from '../add-orden/add-orden.component';


@Component({
  selector: 'app-orden',
  imports: [GetOrdenComponent, AddOrdenComponent],
  templateUrl: './orden.component.html',
  styleUrl: './orden.component.scss'
})
export class OrdenComponent {

}
