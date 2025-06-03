import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Services/user-service.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule,
            MatIconModule,
            MatButtonModule,
            RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Output() toggleSidenavEvent = new EventEmitter<void>();
  loggedIn = false

  userService = inject(UserService)
  router = inject(Router)

  ngOnInit(){
    this.userService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    })
  }

  logout(){
    this.userService.isLoggedIn.next(false)
    this.userService.removeToken();
    this.router.navigate([''])
  }

  toggleSidenav() {
    this.toggleSidenavEvent.emit();
  }
}
