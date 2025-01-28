import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { CustomInputComponent } from '../custom-input/custom-input.component';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
  imports: [ReactiveFormsModule, CustomInputComponent],
})
export class CustomFormComponent implements OnInit, OnChanges {
  @Input() formConfig!: {
    name: string;
    label: string;
    type?: string;
    errorMessage?: string;
    options?: { label: string; value: any }[];
  }[];
  @Input() formData!: any;
  @Input() submitAction!: (data: any) => void;
  @Input() menuId!: number;
  @Input() orderId!: number;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] && this.formData) {
      this.formGroup.patchValue(this.formData);
    }
  }

  initializeForm(): void {
    this.formGroup = this.fb.group(
      this.formConfig.reduce((acc, curr) => {
        if (curr.type === 'array') {
          acc[curr.name] = this.fb.array([]);
        } else {
          acc[curr.name] = [
            curr.type === 'checkbox' ? false : '',
            Validators.required,
          ];
        }
        return acc;
      }, {} as any)
    );

    this.formGroup.patchValue(this.formData);
  }

  submit(): void {
    if (this.formGroup.valid) {
      this.submitAction(this.formGroup.value);
    }
  }

  cancel(): void {
    this.location.back();
  }
}
