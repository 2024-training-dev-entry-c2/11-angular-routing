import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IValidator } from '../../interfaces/validator.interface';
import { CommonModule } from '@angular/common';
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule, InputComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  public form = input.required<FormGroup>();
  public title = input<string>();
  public message = input<string>();
  public action = input.required<string>();
  public controls = input.required<IValidator[]>();
  public submit = output<() => void>();
  public open = input<boolean>();
  public close = output<boolean>();

  private modal = document.querySelector('dialog') as HTMLDialogElement;

  public openModal() {
    if (this.open()) {
      this.modal.showModal();
    } else {
      this.modal.close();
    }
  }

  public closeModal() {
    this.close.emit(false);
  }
}
