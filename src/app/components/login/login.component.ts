import { Component, NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TTInputComponent } from '../tt-input/tt-input.component';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule, 
    MatFormFieldModule, 
    TTInputComponent,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //TODO make this more secure with get/set and with private
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}


  login(username: string, password: string) {
    if(this.authService.authenticate(username, password)) {
      this.router.navigate(['/projects'])
    } else {
      console.log("Authentication Failed, user did not log in");
    }

  }
}
