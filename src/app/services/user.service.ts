import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:44338/api/User'

  private isLoggedIn: boolean = false;
  
  constructor(private http: HttpClient) {
    if(localStorage.getItem('isLoggedIn') === null) {
      this.setIsLoggedIn(false);
    }
    this.logout();
  }

  //May not actually need this but well see
  getIsLoggedIn(): boolean {
    // Check if the user is logged in
    let isLoggedIn: boolean;
    let flag: String | null = localStorage.getItem('isLoggedIn');
    if(flag === "true") {
      isLoggedIn = true;
    } else if(flag === "false") {
      isLoggedIn = false;
    } else {
      console.log(`isLoggedIn is set to: ${flag}`);
      isLoggedIn = false;
    }
    return isLoggedIn;
  }

  setIsLoggedIn(isLoggedIn: boolean){
    
    localStorage.setItem('isLoggedIn', `${isLoggedIn}`);
  }

  //For now it just needs to tell me if the username and password are valid
  //TODO Add output from here or another function defining user role
  //TODO Maybe seperate authenticate and login into seperate functions
  authenticate(username: string, password: string) {
    return this.http.post<boolean>(`${this.apiUrl}/authenticate`, { username, password }).pipe(
      tap(response => this.setIsLoggedIn(response))
    );
  }

  logout(): void {
    this.setIsLoggedIn(false);
  }
}
