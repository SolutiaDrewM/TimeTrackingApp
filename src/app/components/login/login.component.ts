import { Component, NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { FormattedButtonComponent } from '../formatted-button/formatted-button.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule,
    FormsModule,
    FormattedButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //TODO make this more secure with get/set and with private
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}


  login(username: string, password: string) {
    if(this.userService.authenticate(username, password)) {
      this.router.navigate(['/projects'])
    } else {
      console.log("Authentication Failed, user did not log in");
    }

  }
}
