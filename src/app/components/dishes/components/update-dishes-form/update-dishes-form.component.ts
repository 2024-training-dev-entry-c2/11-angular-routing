import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CreateDishesFormComponent } from '../create-dishes-form/create-dishes-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-dishes-form',
  imports: [CommonModule, CreateDishesFormComponent],
  templateUrl: './update-dishes-form.component.html',
  styleUrl: './update-dishes-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateDishesFormComponent {


    activeRoute = inject(ActivatedRoute);
    id : number = 0;

    ngOnInit() {
      this.activeRoute.params.subscribe(params => this.id = params['id']);
    }
}
