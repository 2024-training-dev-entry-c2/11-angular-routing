import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../../interfaces/client.interface';

@Component({
  selector: 'app-form-client',
  imports: [ReactiveFormsModule],
  templateUrl: './form-client.component.html',
  styleUrl: './form-client.component.scss',
})
export class FormClientComponent {
  private formBuilder = inject(FormBuilder);
  public clientSelected = input<IClient>();
  public buttonSubmitClick = output<IClient>();

  public clientForm = this.formBuilder.group({
    id: -1,
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required]],
  });

  submit(): void {
    if (this.isSelected()) {
      const formValues = this.clientForm.getRawValue();
      const clientSelected = this.clientSelected();

      this.clientForm.patchValue({
        id: clientSelected?.id,
        nombre: formValues.nombre || clientSelected?.nombre || '',
        email: formValues.email || clientSelected?.email || '',
        telefono: formValues.telefono || clientSelected?.telefono || '',
      });
    }

    if (this.clientForm.valid) {
      this.buttonSubmitClick.emit(
        this.clientForm.getRawValue() as unknown as IClient
      );
    }
  }

  isSelected() {
    return this.clientSelected()?.nombre == '' &&
      this.clientSelected()?.email == '' &&
      this.clientSelected()?.telefono == ''
      ? false
      : true;
  }
}
