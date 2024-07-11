import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValueOf, tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:44338/api/User'

  //private isLoggedIn: boolean = false;
  public username: string = "";
  public User: User = 
  {
    userId: 0,
    username: '',
    password: '',
    roleId: 0,
    role: {
      roleId: 0,
      type: ''
    }
  };
  public role: string = "";

  
  public userSubject = new BehaviorSubject<User>(this.User);
  public user$ = this.userSubject.asObservable();

  
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

  //Toggle our private isLoggedIn value
  setIsLoggedIn(isLoggedIn: boolean){
    localStorage.setItem('isLoggedIn', `${isLoggedIn}`);
  }

  //Authenticates if the username and password are valid
  authenticate(username: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/authenticate`, { username, password }).pipe(
      tap(response => this.setIsLoggedIn(response))
    );
  }

  getUser(username: string) {
    this.http.get<User>(`${this.apiUrl}/login/${username}`).subscribe(user => {
      this.userSubject.next(user)
    })
  }

  //Checks role based on username
  getRole(username: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/role`, username).pipe(
      tap(role => console.log(role))
    )
  }

  logout(): void {
    this.setIsLoggedIn(false);
  }
}
