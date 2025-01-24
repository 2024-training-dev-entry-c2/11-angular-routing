import { Routes } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { MainComponent } from '../main/main.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HeaderComponent,
        outlet: 'header'
      },
      {
        path: '',
        component: MainComponent,
     
      },
      {
        path: '',
        component: FooterComponent,
        outlet: 'footer'
      },
    ]
  },
  
  
];