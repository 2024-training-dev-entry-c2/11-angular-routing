import { Component, input } from '@angular/core';
import { UserResponse } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-card-user',
  imports: [],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.scss',
})
export class CardUserComponent {
  user = input<UserResponse>();
}
