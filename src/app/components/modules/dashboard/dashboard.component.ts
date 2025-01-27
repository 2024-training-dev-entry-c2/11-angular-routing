import { Component } from '@angular/core';
import { delay, of, tap } from 'rxjs';
import { LoaderComponent } from "../../loader/loader.component";

@Component({
  selector: 'app-dashboard',
  imports: [LoaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  loader: boolean = false;
  constructor(){
      of(1)
          .pipe(
            tap(() => (this.loader = true)),
            delay(1500),
            tap(() => {
              this.loader = false;
            })
          )
          .subscribe();
  }

}
