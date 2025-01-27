import { Component } from '@angular/core';
import { DishFormComponent } from '../dish-form/dish-form.component';
@Component({
  selector: 'app-dish-update',
  imports: [DishFormComponent],
  templateUrl: './dish-update.component.html',
  styleUrl: './dish-update.component.scss'
})
export class DishUpdateComponent {
  public title: String = "Actualizar Plato";
  public action: String = "update";
}
