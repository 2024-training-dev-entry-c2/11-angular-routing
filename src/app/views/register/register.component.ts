import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../interfaces/auth.interface';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { DataService } from '../../core/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;

  formErrors = {
    emailError: false,
    passwordError: false,
    roleError: false,
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/
          ),
        ],
      ],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formErrors.emailError = false;
    this.formErrors.passwordError = false;
    this.formErrors.roleError = false;
    if (this.registerForm.valid) {
      const credentials = this.registerForm.value;
      this.authService
        .register(credentials)
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
            this.dataService.setErrorMessage('Register error');
            this.dataService.setError(true);
          },
        });
    } else {
      if (this.registerForm.get('email')?.invalid) {
        this.formErrors.emailError = true;
      }
      if (this.registerForm.get('password')?.invalid) {
        this.formErrors.passwordError = true;
      }
      if (this.registerForm.get('role')?.invalid) {
        this.formErrors.roleError = true;
      }
    }
  }

  onValueChange(value: keyof typeof this.formErrors) {
    this.formErrors[value] = false;
  }
}
