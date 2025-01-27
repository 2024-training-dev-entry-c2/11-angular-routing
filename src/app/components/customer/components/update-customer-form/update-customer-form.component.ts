import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CustomerFormComponent } from "../customer-form/customer-form.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-customer-form',
  imports: [CustomerFormComponent],
  templateUrl: './update-customer-form.component.html',
  styleUrl: './update-customer-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateCustomerFormComponent implements OnInit {

  activeRoute = inject(ActivatedRoute);
  id : number = 0;

  ngOnInit() {
    this.activeRoute.params.subscribe(params => this.id = params['id']);
  }

}
