import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-input-custom',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './input-custom.component.html',
  styleUrl: './input-custom.component.scss'
})
export class InputCustomComponent {
  @Input() label: string = ''; 
  @Input() type: string = 'text'; 
  @Input() placeholder: string = '';
  @Input() control!: FormControl; 
  @Input() errorMessages: { [key: string]: string } = {};
}
