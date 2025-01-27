import { Component, input, OnDestroy, OnInit, output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-dialog-error',
  imports: [],
  templateUrl: './dialog-error.component.html',
  styleUrl: './dialog-error.component.scss',
})
export class DialogErrorComponent implements OnInit, OnDestroy {
  text: string = '';
  cancel = output<boolean>();
  private subscription: Subscription | undefined;

  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.subscription = this.dataService.errorMessage$.subscribe((message) => {
      this.text = message;
    });
  }

  onCancel() {
    this.cancel.emit(true);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
