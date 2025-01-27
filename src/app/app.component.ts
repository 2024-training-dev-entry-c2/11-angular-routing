import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { Subscription } from 'rxjs';
import { DataService } from './core/data.service';
import { DialogErrorComponent } from './components/dialog-error/dialog-error.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingScreenComponent, DialogErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'bank-frontend';
  isLoading: boolean = false;
  isError: boolean = false;
  private subscription: Subscription | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.subscription = this.dataService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.subscription = this.dataService.error$.subscribe((error) => {
      this.isError = error;
    });
  }

  onErrorClose() {
    this.dataService.setErrorMessage('');
    this.dataService.setError(false);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
