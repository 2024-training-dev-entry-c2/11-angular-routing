import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { AuthenticateService } from '../../service/authenticate.service';
import { IUserRequestDTO } from '../../interfaces/authinterface';
import { AlertService } from '../../service/alert.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register-modal',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss',
})
export class RegisterModalComponent implements OnDestroy{
//   @Output() close = new EventEmitter<void>()
// username = '';
// password = '';
// private destroy$ = new Subject<void>();
// constructor(
//   private authService: AuthenticateService,
//   private alertService:AlertService
// ) {
//        this.alertService.alert$.pipe(takeUntil(this.destroy$)).subscribe(alert=>{
//             if(alert){
//                 this.close.emit();
//             }
//        })
//   }


// registerUser(){
//    const user : IUserRequestDTO={
//        email: this.username,
//        password:this.password
//     };
//    this.authService.register(user).subscribe(response=>{
 
//  this.alertService.showAlert('El usuario se ha registrado correctamente.','success')

//    })
// }

// onNoClick(): void {
//   this.close.emit()
// }
//  ngOnDestroy(): void {
//       this.destroy$.next();
//      this.destroy$.complete();
//  }
@Output() close = new EventEmitter<void>();
registerForm: FormGroup;
private destroy$ = new Subject<void>();

constructor(
    private authService: AuthenticateService,
    private alertService: AlertService,
    private fb: FormBuilder
) {
    this.registerForm = this.fb.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.alertService.alert$.pipe(takeUntil(this.destroy$)).subscribe(alert => {
        if (alert) {
            this.close.emit();
        }
    });
}

registerUser() {
    if (this.registerForm.valid) {
        const user: IUserRequestDTO = {
            email: this.registerForm.value.username,
            password: this.registerForm.value.password
        };
        this.authService.register(user).subscribe(response => {
            this.alertService.showAlert('El usuario se ha registrado correctamente.', 'success');
        });
    }
}

onNoClick(): void {
    this.close.emit();
}

ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
}
}
