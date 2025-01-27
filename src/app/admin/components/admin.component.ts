import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/components/navbar.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
