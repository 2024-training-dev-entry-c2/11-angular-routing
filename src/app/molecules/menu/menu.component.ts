import { Component } from '@angular/core';
import { ImageComponent } from "../../atoms/image/image.component";
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-menu',
  imports: [ImageComponent, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  protected urlImages: string = 'https://cdn.pixabay.com/photo/2015/08/19/02/27/restaurant-895427_1280.png';
}
