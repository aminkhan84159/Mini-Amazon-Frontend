import { Component, inject } from '@angular/core';
import { IUser } from '../../Models/User.Model';
import { UserService } from '../../Services/user-service.service';
import { jwtDecode } from 'jwt-decode';
import { IGetUser } from '../../Models/GetUser.Model';


@Component({
  selector: 'app-my-account',
  imports: [],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {

  user : IUser | any = []
  Id : IGetUser | any = {}

  userService = inject(UserService)

  token : any = this.userService.getToken()
  decoded : any = jwtDecode(this.token)

  ngOnInit() :void{
    this.Id.userId = this.decoded.UserId
    this.userService.getUserById(this.Id).subscribe((res : any) =>{
      console.log(res);
    })
  }
}
