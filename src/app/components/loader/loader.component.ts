import { Component, input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnDestroy {

  showLoader: boolean = false;
  private loaderSubscription: Subscription;
  constructor(private loaderService: LoaderService) {
    this.loaderSubscription = this.loaderService.loading$.subscribe(loading => {
       this.showLoader = loading;
    })
   }

   ngOnDestroy(): void {
       this.loaderSubscription.unsubscribe();
   }
}
