import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { IUserRequest } from '../../interfaces/user.interface';
import { catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-box',
  imports: [ReactiveFormsModule],
  templateUrl: './login-box.component.html',
  styleUrl: './login-box.component.scss',
})
export class LoginBoxComponent implements OnInit {
  isCreatingAccount: boolean = false;
  loginForm: FormGroup;
  trySend: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      email: [''],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.loaderService.show();
    this.trySend = true;
    this.markAsTouched();

    if (this.loginForm.valid) {
      if (this.isCreatingAccount) {
        const request: IUserRequest = {
          username: this.loginForm.get('username')?.value,
          password: this.loginForm.get('password')?.value,
          roles: '',
        };
        this.authService
          .createUser(request)
          .pipe(
            tap(() => this.loaderService.hide()),
            tap(() =>
              this.toastService.emitToast(
                'Success',
                'Account created successfully',
                'success',
                true,
                4000
              )
            ),
            catchError((error: HttpErrorResponse) => {
              const message = error.error?.details[0] as string;
              console.log(error.error?.details);
              switch (error.status) {
                case 500:
                  this.toastService.emitToast(
                    'Error',
                    error.error.details[0],
                    'error',
                    true,
                    4000
                  );
                  break;
              }

              return throwError(() => error);
            })
          )
          .subscribe();
      } else {
        this.authService
          .login({
            username: this.loginForm.get('username')?.value,
            password: this.loginForm.get('password')?.value,
          })
          .pipe(
            tap(() => this.loaderService.hide()),
            tap(() =>
              this.toastService.emitToast(
                'Success',
                'Access granted',
                'success',
                true,
                4000
              )
            ),
            map(
              (response) =>
                response && this.router.navigate(['/dashboard/accounts'])
            ),
            catchError((error: HttpErrorResponse) => {
              const message = error.error?.details[0] as string;
              console.log(error.error?.details);
              switch (error.status) {
                case 500:
                  this.toastService.emitToast(
                    'Error',
                    error.error.details[0],
                    'error',
                    true,
                    4000
                  );
                  break;
              }

              return throwError(() => error);
            })
          )
          .subscribe();
      }
    } else {
      console.log('Formulario inválido.');
    }
  }

  markAsTouched(): void {
    if (this.loginForm) {
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  toggleCreateAccount(): void {
    this.isCreatingAccount = !this.isCreatingAccount;

    if (this.isCreatingAccount) {
      this.loginForm!.get('email')?.setValidators(Validators.required);
    } else {
      this.loginForm!.get('email')?.clearValidators();
      this.loginForm.get('email')?.setValue('');
    }

    this.loginForm!.get('email')?.updateValueAndValidity();
  }
}
function tag(arg0: void): import('rxjs').OperatorFunction<boolean, unknown> {
  throw new Error('Function not implemented.');
}
