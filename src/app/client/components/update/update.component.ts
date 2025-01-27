import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
@Component({
  selector: 'app-update',
  imports: [FormComponent],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  public title: String = "Actualizar Clientes";
  public action: String = "update";
}
