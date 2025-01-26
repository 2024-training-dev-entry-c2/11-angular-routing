import { Component } from '@angular/core';
import { MenuFormComponent } from '../menu-form/menu-form.component';

@Component({
  selector: 'app-menu-register',
  imports: [MenuFormComponent],
  templateUrl: './menu-register.component.html',
  styleUrl: './menu-register.component.scss'
})
export class MenuRegisterComponent {
  public title: String = "Registrar Menu";
  public action: String = "save";
}
