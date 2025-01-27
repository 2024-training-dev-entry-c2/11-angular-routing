import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../../features/auth/components/login/login.component';
import { RegisterComponent } from '../../features/auth/components/register/register.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-auth-container',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    LoginComponent,
    RegisterComponent,
    AlertComponent
  ],
  standalone: true,
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.scss'
})

export class AuthContainerComponent {

  isLoginMode = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    if (this.isLoginMode) {
      console.log('Login:', this.loginForm.value);
    } else {
      console.log('Register:', this.registerForm.value);
    }
  }

}
