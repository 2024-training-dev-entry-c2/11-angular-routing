import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  title = input<string>();
  id = input<string>();
  error = input<boolean>();
  errorMessage = input<string>();
  control = input<FormControl>();
  change = output();

  onValueChange() {
    this.change.emit();
  }
}
