import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-aside',
  imports: [RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  public items = [
    {
      title: 'Cliente',
      link: '/client'
    },
    {
      title: 'Menú',
      link: '/menu'
    },
    {
      title: 'Platos',
      link: '/dishes'
    },
    {
      title: 'Órdenes',
      link: '/order'
    }
  ]
}
