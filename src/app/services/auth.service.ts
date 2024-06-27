import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  
  constructor() { }

  //May not actually need this but well see
  getIsLoggedIn(): boolean {
    // Check if the user is logged in
    return this.isLoggedIn;
  }

  //For now it just needs to tell me if the username and password are valid
  //TODO Add output from here or another function defining user role
  authenticate(username: string, password: string): boolean {
    
    this.isLoggedIn = true;
    return true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
