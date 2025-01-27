import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "@shared/navbar/navbar.component";

@Component({
  selector: 'app-sidebar',
  imports: [NavbarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent { }
