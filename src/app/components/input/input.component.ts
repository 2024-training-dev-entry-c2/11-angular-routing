import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  
  public span = input<string>();
  public typeOf = input<string>();
  public formGroup = input.required<FormGroup>();
  public formControlName = input.required<string>();
  public placeholder = input<string>();
  public isMultiline = input<boolean>();
  public options = input<{ value: any; label: string }[]>();

  value: any = ''; 
  disabled: boolean = false; 
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};


  notValid(): boolean {
    const controlValidator = this.formGroup().get(this.formControlName());
    return !!controlValidator?.invalid && controlValidator?.touched;
  }

  get errorMessage(): string {
    const controlValidator = this.formGroup().get(this.formControlName());
    if (controlValidator?.errors?.["required"]) {
      return 'Campo obligatorio.';
    } else if (controlValidator?.errors?.["email"]) {
      return 'Ingrese un email válido.';
    } else if (controlValidator?.errors?.["min"]) {
      return `El valor mínimo es ${controlValidator?.errors["min"].min}`;
    } else {
      return 'El valor ingresado no es válido.';
    }
  }

  writeValue(value: any): void {
    if (value !== this.value) {
      this.value = value || '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value); 
  }

  isSelect(): boolean {
    return this.typeOf() === 'select';
  }
  
}
