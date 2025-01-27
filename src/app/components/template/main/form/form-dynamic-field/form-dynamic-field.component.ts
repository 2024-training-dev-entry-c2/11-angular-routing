import { Component, input, output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-dynamic-field',
  imports: [ReactiveFormsModule],
  templateUrl: './form-dynamic-field.component.html',
  styleUrl: './form-dynamic-field.component.scss'
})
export class FormDynamicFieldComponent {
  public form = input<FormGroup>();
  public formArray = input<FormArray>();
  public formArrayname = input<string>();
  public field = input<{index:number, field:{key:string, label:string, placeholder:string, type:string, errorMessage:string}}>();
  public onDelete = output<number>();

  get control() {
    return this.formArray()?.get(this.field()!.field.key);
  }

  get quantityControl(): FormControl {
    return this.formArray()!.at(this.field()!.index).get('quantity') as FormControl;
  }

  incrementQuantity(){
    const currentValue = this.quantityControl.value;
    this.quantityControl.setValue(currentValue + 1);
  }

  decrementQuantity(){
    const currentValue = this.quantityControl.value;
    if(currentValue > 1){
      this.quantityControl.setValue(currentValue - 1);
    }
  }

  onDeleteClick():void{
    this.onDelete.emit(this.field()!.index);
  }
}
