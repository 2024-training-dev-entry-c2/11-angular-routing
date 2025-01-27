import { registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers:[{provide: LOCALE_ID, useValue: 'es'}],
  template: '<router-outlet/>',
})
export class AppComponent {
  title = 'restaurant';
}
