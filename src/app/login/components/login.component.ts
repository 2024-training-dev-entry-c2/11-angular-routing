import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IAuth } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroupComponent } from '../../form-group/form-group/form-group.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, FormGroupComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  get usernameControl(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  isSubmitted = false;

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.loginForm.valid) {
      this.isSubmitted = true;
      return;
    }
    const credentials = this.loginForm.getRawValue() as unknown as IAuth;
    const isAuthenticated = this.authService.login(credentials);
    if (!isAuthenticated) {
      alert('Usuario o contraseña incorrectos');
    } else {
      this.router.navigate(['/']);
    }
  }
}
