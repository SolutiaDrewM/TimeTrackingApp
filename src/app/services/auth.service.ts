import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private isLoggedIn: boolean = false;
  
  constructor() {
    if(localStorage.getItem('isLoggedIn') === null) {
      this.setIsLoggedIn(false);
    }
  }

  //May not actually need this but well see
  getIsLoggedIn(): boolean {
    // Check if the user is logged in
    let isLoggedIn: boolean;
    let flag: String | null = localStorage.getItem('isLoggedIn');
    if(flag === "true") {
      console.log(`isLoggedIn is set to: ${flag}`);
      return true;
    } else if(flag === "false") {
      console.log(`isLoggedIn is set to: ${flag}`);
      return false
    } else {
      console.log(`isLoggedIn is set to: ${flag}`);
      return false;
    }
  }

  setIsLoggedIn(isLoggedIn: boolean){
    localStorage.setItem('isLoggedIn', `${isLoggedIn}`);
  }

  //For now it just needs to tell me if the username and password are valid
  //TODO Add output from here or another function defining user role
  //TODO Maybe seperate authenticate and login into seperate functions
  authenticate(username: string, password: string): boolean {
    this.setIsLoggedIn(true);
    return true;
  }

  logout(): void {
    this.setIsLoggedIn(false);
  }
}
