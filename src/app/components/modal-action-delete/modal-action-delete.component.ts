import { Component, inject, Input, input, OnDestroy, OnInit, output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalDeleteService } from '../../services/modal-delete.service';
import { getClientsService } from '../../services/clients.service';
import { IClients } from '../../interface/clients.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-action-delete',
  imports: [CommonModule],
  templateUrl: './modal-action-delete.component.html',
  styleUrl: './modal-action-delete.component.scss'
})
export class ModalActionDeleteComponent implements OnInit {
  private subscription!: Subscription;
  private clientToDeleteSubscription!: Subscription;
  private clientToDelete: IClients | null = null;
  isOpen = false;
  @Input() deleteAction?: () => void;

  constructor(
    private modalService: ModalDeleteService,
    private clientsService: getClientsService
  ) {}

  ngOnInit() {
    this.subscription = this.modalService.modalState$.subscribe(
      (state) => (this.isOpen = state)
    );

    // // Subscribe to the client to delete
    // this.clientToDeleteSubscription = this.clientsService.getClientToDelete().subscribe(
    //   (client) => {
    //     this.clientToDelete = client;
    //   }
    // );
    
  }

  closeModal() {
    this.modalService.closeModal();
  }

  deleteData() {
    if (this.deleteAction) {
      this.deleteAction();
      this.closeModal();
    }
  }

}
