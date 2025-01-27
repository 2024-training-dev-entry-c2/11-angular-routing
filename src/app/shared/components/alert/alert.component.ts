import { Component, inject } from '@angular/core';
import { AlertService } from '../../../core/services/alert.service';
@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  alert = inject(AlertService).alert;
}
