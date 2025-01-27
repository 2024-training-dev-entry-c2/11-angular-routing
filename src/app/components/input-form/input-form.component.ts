import { Component, ElementRef, input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  imports: [ReactiveFormsModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss'
})
export class InputFormComponent implements OnChanges {

  label = input<string>('');
   controlName =input<string>('');
   type = input<string>('text');
   formGroup = input<FormGroup>();
   formControl!: FormControl;
   fieldType  =  input<string>();
   options  =  input<{label: string, value:  string}[]>();


   ngOnChanges(changes: SimpleChanges): void {
     if(changes['controlName'] && this.formGroup()){
       this.formControl = this.formGroup()!.get(this.controlName()) as FormControl;
     }
   }
}
