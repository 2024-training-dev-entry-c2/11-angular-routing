import { Component, input, output, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormDynamicFieldComponent } from './form-dynamic-field/form-dynamic-field.component';
import { delay } from 'rxjs';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, FormFieldComponent, FormDynamicFieldComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  public title = input<string>();
  public buttonText = input<string>();
  public dynamicButtonText = input<string>();
  public formFields = input<{key:string,label:string, placeholder:string, type:string, errorMessage:string }[]>();
  public formArrayName = input<string>();
  public formDynamicField = input<{key:string, label:string, placeholder:string, type:string, errorMessage:string}>();
  public idItem = input<string>();
  public initialData = input<{key:string, content:any}[]>();
  public initialDynamicData = input<{ key: string; content: string | number, quantity: number }[]>();
  public onSuccess = output<any>();
  public onClose  = output<boolean>();

  private formBuilder = inject(FormBuilder);
  public form: FormGroup = this.formBuilder.group({});  


  ngOnInit(){
    const formFieldsValue = this.formFields();
    formFieldsValue?.forEach(field => {
      this.form.addControl(
        field.key,
        this.formBuilder.control('', Validators.required)
      );
    })

    this.form.addControl(this.formArrayName()!, this.formBuilder.array([]))
    
    setTimeout(() => {
    const formDynamicFieldsValue = this.initialDynamicData();
    console.log(formDynamicFieldsValue);
    formDynamicFieldsValue?.forEach(field =>{
      const key = field.key;
      const keyvalue = field.content;
      const quantity = field.quantity;
      
      const newItem = this.formBuilder.group({
        [key!]: [keyvalue, Validators.required],
        quantity: [quantity, [Validators.required, Validators.min(1)]] 
      });
      this.items.push(newItem);
    })
    }, 200); 
  }

  getFormArrayControls() {
    const formArray = this.form.get(this.formArrayName()!);
    if (formArray instanceof FormArray) {
      return formArray.controls;
    }
    return [];
  }
  

  get items(): FormArray {
    return this.form.get(this.formArrayName()!) as FormArray;
  }

  addItem(): void {
    console.log(this.form.value);
    const key = this.formDynamicField()?.key;
    const newItem = this.formBuilder.group({
      [key!]: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]] 
    });
    console.log("item: " + newItem.value);
    this.items.push(newItem);
  }

  deleteItem(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit(): void{
    if(this.form.valid){
      const formValue = { ...this.form.value, idItem: this.idItem() };
      console.log('Form data:', this.form.value);
      this.onSuccess.emit(formValue);
      this.form.reset();
    }
  }

  onCloseForm(): void{
    this.form.reset();
    this.onClose.emit(true);
  }
};
