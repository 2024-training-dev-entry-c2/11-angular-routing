import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../../core/services/alert.service';
import { AuthService } from '../../services/auth.services';

@Component({
 selector: 'app-register',
 standalone: true,
 imports: [ReactiveFormsModule, CommonModule],
 templateUrl: './register.component.html',
 styleUrl: './register.component.scss',
})
export class RegisterComponent {
 registerForm: FormGroup;
 @Output() switchMode = new EventEmitter<void>();
 alertService = inject(AlertService);


 constructor(
   private fb: FormBuilder,
   private authService: AuthService,
 ) {
   this.registerForm = this.fb.group({
     email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.minLength(6)]],
     role: "GOD",
   });
 }

 onSubmit() {
   if (this.registerForm.valid) {
     const { email, password, role } = this.registerForm.value;
     this.authService.register(email, password, role).subscribe({
       next: () => {
         this.alertService.showAlert("Registration Success","success");
         this.toLogin();
       },
       error: (error) => {
         console.error('Registration failed:', error);
       }
     });
   }
 }

 toLogin() {
   this.switchMode.emit();
 }
 
}