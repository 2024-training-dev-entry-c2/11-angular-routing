import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMenu } from '../../../interfaces/menu.interface';

@Component({
  selector: 'app-form-menu',
  imports: [ReactiveFormsModule],
  templateUrl: './form-menu.component.html',
  styleUrl: './form-menu.component.scss',
})
export class FormMenuComponent {
  private formBuilder = inject(FormBuilder);
  public menuSelected = input<IMenu>();
  public buttonSubmitClick = output<IMenu>();

  public menuForm = this.formBuilder.group({
    id: -1,
    nombre: ['', [Validators.required]],
    urlImage: ['', [Validators.required]],
  });

  submit(): void {
    if (this.isSelected()) {
      const formValues = this.menuForm.getRawValue();
      const menuSelected = this.menuSelected();

      this.menuForm.patchValue({
        id: menuSelected?.id,
        nombre: formValues.nombre || menuSelected?.nombre || '',
        urlImage: formValues.urlImage || menuSelected?.urlImage || '',
      });
    }

    if (this.menuForm.valid) {
      this.buttonSubmitClick.emit(
        this.menuForm.getRawValue() as unknown as IMenu
      );
    }
  }

  isSelected() {
    return this.menuSelected()?.nombre == '' &&
      this.menuSelected()?.urlImage == ''
      ? false
      : true;
  }
}
