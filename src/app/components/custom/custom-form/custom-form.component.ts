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
import { CustomInputComponent } from '../custom-input/custom-input.component';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
  imports: [ReactiveFormsModule, CustomInputComponent],
  standalone: true,
})
export class CustomFormComponent implements OnInit, OnChanges {
  @Input() formConfig!: {
    name: string;
    label: string;
    type?: string;
    errorMessage?: string;
  }[];
  @Input() formData!: any;
  @Input() submitAction!: (data: any) => void;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
        acc[curr.name] = [
          curr.type === 'checkbox' ? false : '',
          Validators.required,
        ];
        return acc;
      }, {} as any)
    );

    if (this.formData) {
      this.formGroup.patchValue(this.formData);
    }
  }

  submit(): void {
    if (this.formGroup.valid) {
      this.submitAction(this.formGroup.value);
    }
  }
}
