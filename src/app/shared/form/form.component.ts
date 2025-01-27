import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientsComponent } from '../../pages/clients/clients.component';
import { IFormConfig, IFormField } from '../../interfaces/client/fields';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input() config!: IFormConfig;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private cliente: ClientsComponent) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const formControls: { [key: string]: {} } = {};

    this.config.fields.forEach((field: IFormField) => {
      formControls[field.name] = ['', Validators.required];

      if (field.type === 'email') {
        formControls[field.name] = [
          '',
          [Validators.required, Validators.email],
        ];
      }
    });

    this.form = this.fb.group(formControls);
  }

  onSubmit() {
    if (this.config.action === 'crear' && this.config.service === 'clientes') {
      this.cliente.createClient(this.form.value);
      console.log('Crear cliente se creooo');
    }
  }
}
