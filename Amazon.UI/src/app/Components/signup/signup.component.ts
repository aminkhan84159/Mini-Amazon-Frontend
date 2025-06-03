import { Component, inject, signal } from '@angular/core';
import { ISignUp } from '../../Models/SignUp.Model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [MatFormFieldModule,
            FormsModule,
            MatIconModule,
            MatInputModule,
            MatButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm : ISignUp | any ={}
  userService = inject(UserService)
  router = inject(Router)

  IsMatch : boolean = false;

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  comparePassword(pws: string, cPws: string) {
    if (pws !== cPws) {
      this.IsMatch = true;
    }
    else {
      this.IsMatch = false;
    }
  }

  signup(){
    this.userService.signup(this.signupForm).subscribe((res:any) => {
      console.log(res.token)

      if(res.token){
        this.userService.isLoggedIn.next(true)
        this.userService.setToken(res.token)
        this.router.navigate([''])
      }
    })
  }
}
