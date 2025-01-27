import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Link } from '@interfaces/link.interface';

@Component({
  selector: 'app-link',
  imports: [CommonModule,RouterLink],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {

  @Input() link: Link = {} as Link;
}
