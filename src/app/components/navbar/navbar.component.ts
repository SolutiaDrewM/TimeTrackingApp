import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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
  username: string =""
  ngOnInit(): void {
    this.username = this.userService.username;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
