import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../../interfaces/user';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{


  constructor(private userService: UserService, private router: Router) {}

  User: User = {
    userId: 0,
    username: '',
    password: '',
    roleId: 0,
    role: {
      roleId: 0,
      type: ''
    }
  };
  username: string ="";
  role: string = "";
  user$: Observable<User> = this.userService.userSubject.asObservable();


  ngOnInit(): void {
    this.username = this.userService.username;
    this.user$.subscribe(u => {
        this.User = u;
        this.role = u.role.type;
      });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
