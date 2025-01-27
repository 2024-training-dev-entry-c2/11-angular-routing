import { Component } from '@angular/core';
import { LoginBoxComponent } from '../../components/login-box/login-box.component';
import { LoginCoverComponent } from '../../components/login-cover/login-cover.component';
import { LoaderComponent } from "../../components/loader/loader.component";
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-login',
  imports: [LoginBoxComponent, LoginCoverComponent, LoaderComponent, ToastComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
