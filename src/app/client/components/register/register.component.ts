import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
@Component({
  selector: 'app-register',
  imports: [FormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public title: String = "Registrar Clientes";
  public action: String = "save";
}
