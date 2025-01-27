import { Component } from '@angular/core';
import { MenuFormComponent } from '../menu-form/menu-form.component';
@Component({
  selector: 'app-menu-update',
  imports: [MenuFormComponent],
  templateUrl: './menu-update.component.html',
  styleUrl: './menu-update.component.scss'
})
export class MenuUpdateComponent {
  public title: String = "Actualizar Menu";
  public action: String = "update";
}
