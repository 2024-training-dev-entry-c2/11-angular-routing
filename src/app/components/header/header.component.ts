import { Component, inject, input, output } from '@angular/core';
import { IconButtonComponent, IModalActions, TActions } from '../icon-button/icon-button.component';
import { UserInfoService } from '../../services/user-info.service';

export interface IHeaderActions {
  icon: string;
  textButton: string;
  action: TActions;
}




@Component({
  selector: 'app-header',
  imports: [IconButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userInfoService = inject(UserInfoService);

  public username  = this.userInfoService.getUserInfo()?.username;
  openModal = input<IModalActions>();
  modalInfo = output<IModalActions>();

  headerActions:IHeaderActions[] = [
    {
      icon: "assets/svg/piggibank.svg",
      textButton: "Create Account",
      action: "create-account",
    },
    {
      icon: "assets/svg/card_logo.svg",
      textButton: "Create card",
      action: "create-card",
    },
    {
      icon: "assets/svg/transfer.svg",
      textButton: "Create Transaction",
      action: "create-transaction",
    },
  ]
}
