import { Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-card-info',
  imports: [],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss'
})
export class CardInfoComponent {
  iconClass = input<string>();
  cardAccountNumber = input<string>();
  balance = input<number>();
  type = input<string>();
  balanceType = input<string>();
  expireDate = input<string>();

  info =  output<string>()

  constructor(){

  }

  onClick(cardNumber: string){
    console.log("Clciking me ?")
    this.info.emit(cardNumber);
  }
}
