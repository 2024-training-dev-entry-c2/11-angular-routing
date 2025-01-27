import { NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  imports: [NgSwitch, NgSwitchCase],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.scss',
})
export class HeadingComponent {
  @Input() level: 'h1' | 'h2' | 'h3' = 'h1'; // Nivel del encabezado
  @Input() text = ''; // Texto del encabezado
}
