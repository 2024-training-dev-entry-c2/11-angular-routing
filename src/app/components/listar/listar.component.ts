import { Component } from '@angular/core';
import { input } from '@angular/core';

@Component({
  selector: 'app-listar',
  imports: [],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.scss'
})
export class ListarComponent {
  public resultado = input<Object[]>();
}
