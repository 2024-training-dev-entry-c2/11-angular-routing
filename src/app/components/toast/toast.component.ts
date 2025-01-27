import { Component, inject, OnDestroy } from '@angular/core';
import { Subject, takeUntil, timer } from 'rxjs';
import { ToastService } from '../../services/toast.service';


export interface IToast {
  title: string,
  message: string,
  type: string,
  duration: number | 3000,
  close: boolean | true
}

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnDestroy {
  toastData: IToast | undefined;
  toastService = inject(ToastService);

  private destroy$ = new Subject<void>();
  show: boolean = false;

  constructor() {
    this.toastService.$toastData.pipe(takeUntil(this.destroy$)).subscribe(toastData => {
      this.toastData = toastData;
      this.show = true;
      this.startTimer();
    });
  }

  startTimer(): void {
    timer(this.toastData?.duration as number)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.closeToast();
      });
  }

  closeToast(): void {
    this.show = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
