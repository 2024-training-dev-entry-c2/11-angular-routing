import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAuth } from '../../../interfaces/auth.interface';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  faUserPlus = faUserPlus;
  faPiggyBank = faPiggyBank;
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  constructor(private toastr: ToastrService, private router: Router) { }

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]]
  });

  submit(): void {
    const authData: IAuth = this.loginForm.getRawValue() as IAuth;

    if (this.loginForm.valid) {
      this.authService.login(authData)
        .subscribe(
          {
            next: finalResponse => {
              this.toastr.success('Usuario autenticado exitosamente');
              this.router.navigate(['/dashboard']);
            },
            error: error => {
              console.error('Error en la petición:', error);
              this.toastr.error('Error en la autenticación. Credenciales Incorrectas');
            }
          }
        );
    } else {
      this.toastr.warning('Por favor, complete los campos requeridos');
    }
  }
}
