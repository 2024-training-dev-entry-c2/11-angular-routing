import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-accounts-info',
  imports: [],
  templateUrl: './accounts-info.component.html',
  styleUrl: './accounts-info.component.scss'
})
export class AccountsInfoComponent {
iconClass = input<string>();
  cardAccountNumber = input<string>();
  balance = input<number>();
  type = input<string>();
  balanceType = input<string>();

  info =  output<string>()

  constructor(){

  }

  onClick(numberAcc: string){
    console.log("Clciking me ?")
    this.info.emit(numberAcc);
  }
}
