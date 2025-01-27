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
  selector: 'app-form-update',
  imports: [ReactiveFormsModule],
  templateUrl: './form-update.component.html',
  styleUrl: './form-update.component.scss',
})
export class FormUpdateComponent {
  @Input() config!: IFormConfig;
  @Input() id: number = 0;
  @Input() data:
    | { name: string; email: string; phone: number; address: string }
    | undefined;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private cliente: ClientsComponent) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const formControls: { [key: string]: {} } = {};

    this.config.fields.forEach((field: IFormField) => {
      formControls[field.name] = [
        this.data ? this.data.name : '',
        Validators.required,
      ];

      if (field.type === 'email') {
        formControls[field.name] = [
          this.data ? this.data.email : '',
          [Validators.required, Validators.email],
        ];
      }
    });

    this.form = this.fb.group(formControls);
  }

  onSubmit() {
    if (this.config.action === 'editar' && this.config.service === 'clientes') {
      this.cliente.editClient(this.id, this.form.value);
      console.log('Usuario creado con exito');
    }
  }
}
