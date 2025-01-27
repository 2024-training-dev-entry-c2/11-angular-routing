import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export  interface IState{
  isUpdated: boolean;
  resource: "account" | "card" |  "transaction" |  "none"
  resourceDetail?: {
    accountNumber: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private state = new BehaviorSubject<IState>({
      isUpdated: false,
      resource: "none"
    });
    state$ = this.state.asObservable();
  
    constructor() { }
  
  
    upddateState(stateUpdate: IState) {
      this.state.next(stateUpdate);
    }
}
