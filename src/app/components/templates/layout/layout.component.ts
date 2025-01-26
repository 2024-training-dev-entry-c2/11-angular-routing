import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../organisms/header/header.component';
import { FooterComponent } from '../../organisms/footer/footer.component';
import { LeftAsideComponent } from '../../organisms/left-aside/left-aside.component';
import { RightAsideComponent } from '../../organisms/right-aside/right-aside.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LeftAsideComponent,
    RightAsideComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {}
