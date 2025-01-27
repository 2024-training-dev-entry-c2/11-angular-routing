import { CurrencyPipe } from '@angular/common';
import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, CurrencyPipe],
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
  public totalPrice = input<number>();
  public span = input<string>();
  public typeOf = input<string>();
  public formGroup = input.required<FormGroup>();
  public formControlName = input.required<string>();
  public placeholder = input<string>();
  public options = input<{ value: any; label: string }[]>(); 
  
  value: any = ''; 
  disabled: boolean = false; 
  selectedTags: { value: any; label: string }[] = [];

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
      if (this.typeOf() === 'multiselect') {
        this.selectedTags = this.options()?.filter(option => value?.includes(option.value)) || [];
      }
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

  isMultiselect(): boolean {
    return this.typeOf() === 'multiselect';
  }

  addTag(value: any): void {
    const option = this.options()?.find(opt => opt.value === value);
    if (option) {
      this.selectedTags.push(option);
      this.updateValue();
    }
  }

  removeTag(value: any): void {
    const index = this.selectedTags.findIndex(tag => tag.value === value);
    if (index > -1) {
      this.selectedTags.splice(index, 1); 
      this.updateValue();
    }
  }
  

  private updateValue(): void {
    const values = this.selectedTags.map(tag => tag.value);
    this.value = values;
    this.onChange(values);
  }

  handleSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select?.value;
  
    if (value) {
      this.addTag(value);
    } else {
      console.warn('Valor nulo o indefinido seleccionado.');
    }
  }
  
}
