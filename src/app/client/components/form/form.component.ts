import { Component,inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  title = String;
  private formBuilder = inject(FormBuilder);

  public form = this.formBuilder.group({
    name: ['', [Validators.required]],
    nit: ['', [Validators.required,Validators.pattern(/^[1-9]+$/)]],
    email: ['', [Validators.required,Validators.email]],
    phone: ['', [Validators.pattern(/^[1-9]+$/)]]
  })


}
