import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IModalActions } from '../components/icon-button/icon-button.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modal = new BehaviorSubject<IModalActions>({
    isOpenModal: false,
    action: "create-account",
    modalClass: "",
    header: ""

  });
  modal$ = this.modal.asObservable();

  constructor() { }


  activate(actions: IModalActions) {
    this.modal.next(actions);
  }

  

}
