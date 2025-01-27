import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  imports: [ReactiveFormsModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  public form = input<FormGroup>();
  public field = input<{key:string,label:string, placeholder:string, type:string, errorMessage:string }>();
  public initialData = input<any>();

  get control() {
    return this.form()?.get(this.field()!.key);
  }
}
