import { Component, input, output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  public title = input<string>();
  public buttonText = input<string>();
  public formFields = input<{key:string,label:string, placeholder:string, type:string, errorMessage:string }[]>();
  public idItem = input<string>();
  public initialData = input<any>();
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
