import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ILogin } from '../../Models/Login.Model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule,
            MatLabel,
            MatIconModule,
            FormsModule,
            MatInputModule,
            MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm : ILogin | any = {}
  userService = inject(UserService)
  router = inject(Router)

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onLogin(){
    this.userService.login(this.loginForm).subscribe((res: any) => {
      console.log(res.token)

      if(res.token){
        this.userService.setToken(res.token)
        this.userService.isLoggedIn.next(true)
        this.router.navigate([''])
      }
    })
  }
}
