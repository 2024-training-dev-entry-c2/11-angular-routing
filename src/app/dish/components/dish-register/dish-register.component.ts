import { Component } from '@angular/core';
import { DishFormComponent } from '../dish-form/dish-form.component';
@Component({
  selector: 'app-dish-register',
  imports: [DishFormComponent],
  templateUrl: './dish-register.component.html',
  styleUrl: './dish-register.component.scss'
})
export class DishRegisterComponent {
  public title: String = "Registrar Plato";
  public action: String = "save";
}
