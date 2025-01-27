import { Component, input } from '@angular/core';
import { AccountResponse } from '../../../interfaces/account.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faUniversity,
  faMoneyBillWave,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-account',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './card-account.component.html',
  styleUrl: './card-account.component.scss',
})
export class CardAccountComponent {
  account = input<AccountResponse>();

  faUser = faUser;
  faUniversity = faUniversity;
  faMoneyBillWave = faMoneyBillWave;
  faIdCard = faIdCard;
}
