import { Component, input, output } from '@angular/core';
import { BigModalComponent } from "../big-modal/big-modal.component";
import { ModalService } from '../../services/modal.service';

export type TActions = "create-account" | "create-card" | "create-transaction";
export interface IModalActions {
  isOpenModal: boolean;
  action: TActions;
  modalClass: "modal--right" | "";
  header: string
}

@Component({
  selector: 'app-icon-button',
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent {
  public textButton = input<string>();
  public icon = input<string>();
  public class = input<string>();
  constructor(private  modalService: ModalService){

  }

  action = input<TActions>();
  openModal = output<IModalActions>();

  isModalVisible = false;
  modalClass: string = '';

  handleOpenModal() {
    const actions: IModalActions = {
      isOpenModal: true,
      action: this.action()!,
      modalClass: "modal--right",
      header: this.textButton()!

    }
    this.modalService.activate(actions);
  }

  
  handleCloseModal() {
    const actions: IModalActions = {
      isOpenModal: false,
      action: this.action()!,
      modalClass: "",
      header: this.textButton()!


    }
    this.modalService.activate(actions);


  }
}
