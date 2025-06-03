import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
            NavbarComponent,
            MatSidenavModule,
            MatListModule,
            MatIconModule,
            MatButtonModule,
            RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Amazon.UI';

}