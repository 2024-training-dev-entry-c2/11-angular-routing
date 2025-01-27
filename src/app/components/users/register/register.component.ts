import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAuth } from '../../../interfaces/auth.interface';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  faRightToBracket = faRightToBracket;
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor(private toastr: ToastrService, private router: Router) { }

  public registerForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    role: ['GOD', Validators.required],
    documentId: ['', Validators.required],
  });

  submit(): void {
    const authData: IAuth = this.registerForm.getRawValue() as IAuth;

    if (this.registerForm.valid) {
      this.authService.register(authData)
        .subscribe(
          {
            next: () => {
              this.toastr.success('Usuario registrado exitosamente');
              this.router.navigate(['/dashboard']);
            },
            error: error => {
              console.error('Error en la petición:', error);
              this.toastr.error('Error en el registro, intentelo de nuevo');
            }
          });
    } else {
      this.toastr.warning('Por favor, complete los campos requeridos');
    }
  }
}
