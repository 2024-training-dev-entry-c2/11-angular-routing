import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { AuthResponse } from '../../interfaces/auth.interface';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  formErrors = {
    emailError: false,
    passwordError: false,
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.formErrors.emailError = false;
    this.formErrors.passwordError = false;
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.dataService.setLoading(true);
      this.authService
        .login(credentials)
        .pipe(finalize(() => this.dataService.setLoading(false)))
        .pipe(
          catchError((error) => {
            this.errorMessage = error.message;
            return throwError(() => error);
          }),
          tap((response: AuthResponse) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem(
              'user',
              JSON.stringify({ email: response.email, id: response.id })
            );
          })
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.log(error);
            if (
              error.status === 403 &&
              error.error &&
              error.error.error === 'Bad credentials'
            ) {
              this.dataService.setErrorMessage('Bad credentials');
            } else {
              this.dataService.setErrorMessage('Login error');
            }
            this.dataService.setError(true);
          },
        });
    } else {
      if (this.loginForm.get('email')?.invalid) {
        this.formErrors.emailError = true;
      }
      if (this.loginForm.get('password')?.invalid) {
        this.formErrors.passwordError = true;
      }
    }
  }

  onValueChange(value: keyof typeof this.formErrors) {
    this.formErrors[value] = false;
  }
}
