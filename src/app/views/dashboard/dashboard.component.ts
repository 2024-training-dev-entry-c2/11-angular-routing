import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { LoaderService } from '../../services/loader.service';
import { BigModalComponent } from '../../components/big-modal/big-modal.component';
import { ModalService } from '../../services/modal.service';
import { IModalActions } from '../../components/icon-button/icon-button.component';
import { Subscription } from 'rxjs';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    SidebarComponent,
    LoaderComponent,
    BigModalComponent,
    ToastComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  isModalVisible = false;
  modalClass: string = '';

  private modalSubscription: Subscription;

  constructor(
    private loaderService: LoaderService,
    private modalService: ModalService,
  ) {
    this.modalSubscription = this.modalService.modal$.subscribe(
      (actions: IModalActions) => {
        this.isModalVisible = actions.isOpenModal;
      }
    );
    
  }
  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }
  ngOnInit(): void {}

  openModal() {
    this.isModalVisible = true;
    this.modalClass = 'modal--right';
  }

  closeModal() {
    this.isModalVisible = false;
    this.modalClass = 'modal';
  }

  showLoading() {
    this.loaderService.show();
    setTimeout(() => {
      this.loaderService.hide();
    }, 5000);
  }
}
