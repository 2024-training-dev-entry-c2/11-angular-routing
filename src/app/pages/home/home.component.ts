import { Component } from '@angular/core';
import { SlideComponent } from '../../components/slide/slide.component';
import { GeneralMetricsComponent } from '../../components/general-metrics/general-metrics.component';
import { ActionsComponent } from '../../components/actions/actions.component';

@Component({
  selector: 'app-home',
  imports: [SlideComponent, GeneralMetricsComponent, ActionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
