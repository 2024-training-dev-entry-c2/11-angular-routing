import { Component } from '@angular/core';

@Component({
  selector: 'app-slide',
  imports: [],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.scss',
})
export class SlideComponent {
  public images = [
    {
      src: '../../../../public/dishes/plato1.jpg',
      alt: 'Plato Frijoles',
    },
    {
      src: '../../../../public/dishes/plato2.jpg',
      alt: 'Casuela fija',
    },
    {
      src: '../../../../public/dishes/plato3.jpg',
      alt: 'Sopa de pollo',
    },
  ];
  public imagesBebidas = [
    {
      src: '../../../../public/dishes/bebida1.jpg',
      alt: 'Agua',
    },
    {
      src: '../../../../public/dishes/bebida2.jpg',
      alt: 'Coca-cola',
    },
    {
      src: '../../../../public/dishes/bebida3.jpg',
      alt: 'Cerveza',
    },
  ];
}
